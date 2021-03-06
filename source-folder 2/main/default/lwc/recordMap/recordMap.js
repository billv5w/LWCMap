/* eslint-disable no-console */
import {LightningElement, api, wire, track} from 'lwc';
import getAddress from '@salesforce/apex/LtngMapController.getAddress';

export default class PropertyMap extends LightningElement {
    @api recordId;
    @api street;
    @api city;
    @api state;
    @api country;
    @api postcode;
    @api zoomLevel;
    @api margin;
    @api marginTitle = '';
    @api recordName = '';
    @api recordDesc = '';

    @track propertyLocs;
    @track error;
    @track error1 = ''
    @track error2 = ''

    @wire(getAddress, {recId: '$recordId', street: '$street', city: '$city', state: '$state', country: '$country', postcode: '$postcode', recordName: '$recordName', recordDesc: '$recordDesc'})
    wiredProperties({error,data}) {
        if (data) {
            this.propertyLocs = data;
            console.log(JSON.stringify(data, null, '\t'));
        } else if (error) {
            console.log('error');
            console.log(JSON.stringify(error, null, '\t'));
            this.error1 = 'Error: No access to specified mapping fields.'
            this.error2 = 'Please consult with your Salesforce Administrator'
            this.error = error;
        }
    }
}