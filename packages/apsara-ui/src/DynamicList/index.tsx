import React, { ButtonHTMLAttributes, useEffect } from "react";
import Icon from "../Icon";
import FormBuilder from "../FormBuilder";
import * as R from "ramda";
import { List } from "rc-field-form";
import { Field, getFormListItemFields } from "./helper";
import { DynamicListContainer } from "./DynamicList.styles";

interface RemoveBtnOnClick {
    event?: React.MouseEvent<HTMLButtonElement>;
    index?: number;
}

type RemoveBtnProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
    onClick?: (props?: RemoveBtnOnClick) => void;
};

interface FormItemDynamicListProps {
    form: any;
    meta: any;
    formListfields: any;
    remove: (name: any) => void;
    add: () => void;
    addBtnText: string;
    addBtnProps?: ButtonHTMLAttributes<HTMLButtonElement>;
    removeBtnProps?: RemoveBtnProps;
}

interface DynamicListProps {
    form: any;
    meta: any;
    addBtnText?: string;
    addBtnProps?: ButtonHTMLAttributes<HTMLButtonElement>;
    removeBtnProps?: RemoveBtnProps;
}

const FormItemDynamicList = ({
    form,
    add,
    meta,
    remove,
    formListfields,
    addBtnText,
    addBtnProps,
    removeBtnProps,
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
                        <button
                            type="button"
                            role="presentation"
                            className="form-dynamic-list__btn-remove"
                            disabled={isDisabled || removeBtnProps?.disabled}
                            {...removeBtnProps}
                            onClick={(e) => {
                                if (!isDisabled && !removeBtnProps?.disabled) {
                                    remove(field.name);
                                    if (removeBtnProps?.onClick) {
                                        removeBtnProps.onClick({ event: e, index });
                                    }
                                }
                            }}
                        >
                            <Icon
                                name="remove"
                                active
                                color="#dc3545"
                                disabled={isDisabled || removeBtnProps?.disabled}
                            />
                        </button>
                    </div>
                );
            })}
            <button
                type="button"
                role="presentation"
                className="form-dynamic-list__btn-add"
                {...addBtnProps}
                onClick={(e) => {
                    add();
                    if (addBtnProps?.onClick) {
                        addBtnProps.onClick(e);
                    }
                }}
            >
                <Icon name="add" active={!addBtnProps?.disabled} />
                {addBtnText}
            </button>
        </DynamicListContainer>
    );
};

export const DynamicList = ({ form, meta, addBtnText = "Add", addBtnProps, removeBtnProps }: DynamicListProps) => {
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
                    removeBtnProps={removeBtnProps}
                />
            )}
        </List>
    );
};

export default DynamicList;
