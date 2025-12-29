import { LightningElement, api } from 'lwc';
import syncToPostgres from '@salesforce/apex/syncWithPostgres.syncToPostgres';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SyncWithPostgresAction extends LightningElement {
    @api recordId; // Automatically provided by Quick Action

    handleSync() {
        console.log('Sync button clicked, recordId=', this.recordId);
        syncToPostgres({ recordId: this.recordId })
            .then(result => {
                this.showToast('Success', result, 'success');
            })
            .catch(error => {
                this.showToast(
                    'Error',
                    error.body ? error.body.message : error.message,
                    'error'
                );
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}