const transformCheckedValue = (value?: string | boolean | 0 | 1) => {
    switch (typeof value) {
        case "string":
            return value === "true" ? true : false;
        case "number":
            return value === 1 ? true : false;
        case "boolean":
            return value;
        default:
            return false;
    }
};

export default transformCheckedValue;
