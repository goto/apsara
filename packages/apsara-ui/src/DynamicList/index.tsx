import React, { ButtonHTMLAttributes, useEffect } from "react";
import Icon from "../Icon";
import FormBuilder from "../FormBuilder";
import * as R from "ramda";
import { List } from "rc-field-form";
import { Field, getFormListItemFields } from "./helper";
import { DynamicListContainer } from "./DynamicList.styles";

interface FormItemDynamicListProps {
    form: any;
    meta: any;
    formListfields: any;
    remove: (name: any) => void;
    add: () => void;
    addBtnText: string;
    addBtnProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

interface DynamicListProps {
    form: any;
    meta: any;
    addBtnText?: string;
    addBtnProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const FormItemDynamicList = ({
    form,
    add,
    meta,
    remove,
    formListfields,
    addBtnText,
    addBtnProps,
}: FormItemDynamicListProps) => {
    // ? We need to do this because we can't set value and initialValue for form.list items from config
    useEffect(() => {
        const metaFieldsWithValue = meta.fields.filter((metaField: { value: string }) => metaField.value);
        const formValues = form?.getFieldsValue();
        if (metaFieldsWithValue.length) {
            const fieldsToSet: Field[] = [];
            formListfields.forEach((field: Field) => {
                const listIndex = field.name;
                metaFieldsWithValue.forEach((metaField: Field) => {
                    const fieldNamepath = [meta.name[0], listIndex, ...metaField.name];
                    // ? we need to check whether path existing before setting otherwise dependencies fields value will also get set
                    if (R.hasPath(fieldNamepath, formValues)) {
                        fieldsToSet.push({
                            name: [meta.name[0], listIndex, ...metaField.name],
                            value: metaField.value,
                            initialValue: metaField.initialValue,
                        });
                    }
                });
            });
            form?.setFields(fieldsToSet);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formListfields, form]);

    return (
        <DynamicListContainer>
            {formListfields.map((field: Field, index: number) => {
                const isDisabled = meta?.disabled?.(index) ?? false;

                const fields = getFormListItemFields(field.name, meta).map((item: any) =>
                    isDisabled ? { ...item, disabled: true } : item,
                );

                return (
                    <div key={field.key} className="form-dynamic-list__item">
                        <FormBuilder.Items index={index} form={form} meta={{ ...meta, fields }} />
                        <Icon
                            className="form-dynamic-list__btn-remove"
                            name="remove"
                            active
                            color="#dc3545"
                            disabled={isDisabled}
                            onClick={() => !isDisabled && remove(field.name)}
                        />
                    </div>
                );
            })}
            <button
                type="button"
                role="presentation"
                onClick={() => {
                    add();
                }}
                className="form-dynamic-list__btn-add"
                {...addBtnProps}
            >
                <Icon name="add" active={!addBtnProps?.disabled} />
                {addBtnText}
            </button>
        </DynamicListContainer>
    );
};

export const DynamicList = ({ form, meta, addBtnText = "Add", addBtnProps }: DynamicListProps) => {
    return (
        <List name={meta.name}>
            {(formListfields, { add, remove }) => (
                <FormItemDynamicList
                    form={form}
                    meta={meta}
                    add={add}
                    remove={remove}
                    formListfields={formListfields}
                    addBtnText={addBtnText}
                    addBtnProps={addBtnProps}
                />
            )}
        </List>
    );
};

export default DynamicList;
