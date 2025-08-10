import { ref } from 'vue';

export function useLogger(initialActivities = []) {
    const activities = ref([...initialActivities]);

    const addActivity = (type, message, details = '', user = 'Current User') => {
        const newActivity = {
            id: Date.now(),
            type,
            user,
            message,
            details,
            timestamp: new Date().toISOString()
        };

        activities.value.unshift(newActivity);
        return newActivity;
    };

    const logCreated = (entityName, details = '') => {
        return addActivity('created', `${entityName} created`, details);
    };

    const logUpdated = (field, oldValue, newValue, details = '') => {
        const message = `Updated ${field}${oldValue ? ` from "${oldValue}" to "${newValue}"` : ` to "${newValue}"`}`;
        return addActivity('updated', message, details);
    };

    const logDeleted = (entityName, details = '') => {
        return addActivity('deleted', `${entityName} deleted`, details);
    };

    const logStatusChanged = (oldStatus, newStatus, details = '') => {
        return addActivity('status_changed', `Status changed from "${oldStatus}" to "${newStatus}"`, details);
    };

    const logPriceUpdated = (oldPrice, newPrice, currency = '$', details = '') => {
        return addActivity('price_updated', `Price updated from ${currency}${oldPrice} to ${currency}${newPrice}`, details);
    };

    const logStockUpdated = (oldStock, newStock, details = '') => {
        return addActivity('stock_updated', `Stock updated from ${oldStock} to ${newStock}`, details);
    };

    const logImageUploaded = (details = '') => {
        return addActivity('image_uploaded', 'Image uploaded', details);
    };

    const logCustomerContacted = (method, details = '') => {
        return addActivity('customer_contacted', `Customer contacted via ${method}`, details);
    };

    const logBookingCreated = (bookingRef, details = '') => {
        return addActivity('booking_created', `Booking created: ${bookingRef}`, details);
    };

    const logNote = (note) => {
        return addActivity('note', note);
    };

    return {
        activities,
        addActivity,
        logCreated,
        logUpdated,
        logDeleted,
        logStatusChanged,
        logPriceUpdated,
        logStockUpdated,
        logImageUploaded,
        logCustomerContacted,
        logBookingCreated,
        logNote
    };
}
