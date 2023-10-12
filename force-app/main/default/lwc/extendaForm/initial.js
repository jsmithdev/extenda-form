export class Field {
    constructor(inputs) {
        //this.super();
        this.apiName = '';
        this.value = '';
        this.label = '';
        this.placeholder = '';
        this.type = 'text';
        this.required = false;
        this.disabled = false;
        this.readonly = false;
        Object.assign(this, inputs);

        this.isPicklist = this.type === 'picklist';
    }
}

export const createField = (field) => new Field(field);

export const object = {
    apiName: 'Account',
};

export const fields = [
    {
        apiName: 'Name',
        label: 'Name Label',
        type: 'text',
        required: false,
        placeholder: 'Name Placeholder',
        value: '',
        disabled: false,
        readonly: false,
    },
    {
        apiName: 'NumberofLocations__c',
        label: 'Number of Locations',
        type: 'number',
        required: false,
        placeholder: 'Name Placeholder',
        value: '',
        disabled: false,
        readonly: false,
    },{
        apiName: 'AccountSource',
        label: 'Source',
        type: 'picklist',
        required: false,
        placeholder: 'Name Placeholder',
        value: '',
        disabled: false,
        readonly: false,
    },
];