import { wire, api, LightningElement} from 'lwc';
import { createRecord, updateRecord } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import ExtendaElement from 'c/extendaElement';
import {
    fields,
    object,
    createField,
} from './initial';

export default class ExtendaForm extends ExtendaElement {

    recordTypeId = undefined;

    @api recordId;

    @api
    get object() {
        return this._object;
    }
    set object(value) {
        this._object = value;
        if(this.fields.some(f => f.isPicklist)){
            this.objectApiName = value.apiName;
        }
    }

    @api
    get fields() {
        return this._fields;
    }
    set fields(value) {
        this._fields = value.map(createField);
    }

    @api
    save() {
        return this.handleSave();
    }

    @wire (getObjectInfo, { objectApiName: '$objectApiName' })
    _setField({ data, error }) {
        this.recordTypeId = data?.defaultRecordTypeId;
    }

    demo() {
        this.fields = fields;
        this.object = object;
    }

    connectedCallback() {
        this.demo();
    }

    handleFieldChange(event) {
        const { name, value } = event.detail;
        const apiName = name || event.target.name;
        const field = this.fields.find(field => field.apiName === apiName);
        field.value = value;
    }

    generateRecord(){
        const record = {
            apiName: this.object.apiName,
            fields: this.fields.reduce((acc, field) => {
                acc[field.apiName] = field.value;
                return acc;
            }, {}),
        };
        if(this.recordId){
            record.fields.Id = this.recordId;
        }
        return record;
    }

    async handleSave() {
        const record = this.generateRecord();
        try {
            const result = await this.upsert(record);

            this.debug({
                where: 'handleSave',
                result  ,
                record  ,
            });

            this.toast({
                variant: 'success', 
                message: 'Record Saved',
            });

            this.recordId = result.id;

            return {
                success: true,
                result,
                record,
            };
        } catch (error) {
            this.debug({
                where: 'handleSave',
                error  ,
            });
            this.handleError(error);
        }
    }

    upsert(record){
        if(this.recordId){
            return updateRecord(record);
        } else {
            return createRecord(record);
        }
    }

    handleFieldChange(event){
        this.debug(event.detail)
        const { fieldApiName, name, value } = event.detail;
        const apiName = fieldApiName || name || event.target.name || event.currentTarget.name;
        const field = this.fields.find(field => apiName === field.apiName)
        field.value = value;
        /* this.debug({
            where: 'handleFieldChange',
            fieldApiName,
            apiName,
            value,
            name,
            field,
        }); */
    }
}