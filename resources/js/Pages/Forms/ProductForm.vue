<script setup>
import { ref, computed } from 'vue';
import { useForm, Head } from '@inertiajs/vue3';
import MainLayout from '@/Layouts/MainLayout.vue';
import { getInventoryNavItems, navigationItems } from '@/@types/NavItems';
import TabContainer from '@/Components/tab/TabContainer.vue';
import TabItem from '@/Components/tab/TabItem.vue';
import { TabPanel } from '@/Components/tab';
import { ImageField, MonetoryField, SelectField, TextAreaField, TextInputField } from '@/Components/form';

const props = defineProps({
    product: {
        type: Object,
        default: () => ({})
    },
    categories: {
        type: Array,
        default: () => [
            { id: 1, name: 'Electronics' },
            { id: 2, name: 'Appliances' },
            { id: 3, name: 'Accessories' },
            { id: 4, name: 'Furniture' },
            { id: 5, name: 'Clothing' },
        ]
    },
    suppliers: {
        type: Array,
        default: () => [
            { id: 1, name: 'Supplier A' },
            { id: 2, name: 'Supplier B' },
            { id: 3, name: 'Supplier C' },
        ]
    },
    activities: {
        type: Array,
        default: () => [
            {
                id: 1,
                type: 'created',
                user: 'John Doe',
                message: 'Product created',
                timestamp: '2025-08-05T10:30:00Z',
                details: 'Initial product setup with basic information'
            },
            {
                id: 2,
                type: 'updated',
                user: 'Sarah Smith',
                message: 'Price updated from $99.99 to $89.99',
                timestamp: '2025-08-05T14:15:00Z',
                details: 'Price reduction due to market competition'
            },
            {
                id: 3,
                type: 'note',
                user: 'Mike Johnson',
                message: 'Added supplier information',
                timestamp: '2025-08-05T16:45:00Z',
                details: 'Connected with Supplier A for bulk ordering'
            }
        ]
    }
});

const emit = defineEmits(['submit', 'cancel']);

const form = useForm({
    name: props.product?.name || '',
    internal_reference: props.product?.internal_reference || '',
    barcode: props.product?.barcode || '',
    category_id: props.product?.category_id || '',
    supplier_id: props.product?.supplier_id || '',
    description: props.product?.description || '',
    sale_price: props.product?.sale_price || '',
    cost_price: props.product?.cost_price || '',
    tax_rate: props.product?.tax_rate || 0,
    initial_stock: props.product?.initial_stock || 0,
    min_stock: props.product?.min_stock || 0,
    max_stock: props.product?.max_stock || '',
    unit: props.product?.unit || 'pcs',
    weight: props.product?.weight || '',
    dimensions: props.product?.dimensions || '',
    status: props.product?.status || 'active',
    track_inventory: props.product?.track_inventory || true,
    can_be_sold: props.product?.can_be_sold || true,
    can_be_purchased: props.product?.can_be_purchased || true,
    image: null,
});

const imagePreview = ref(props.product?.image || null);
const activeTab = ref('general');

const newNote = ref('');
const isAddingNote = ref(false);
const activityList = ref([...props.activities]);

const units = [
    { value: 'pcs', label: 'Pieces' },
    { value: 'kg', label: 'Kilograms' },
    { value: 'g', label: 'Grams' },
    { value: 'ltr', label: 'Liters' },
    { value: 'ml', label: 'Milliliters' },
    { value: 'm', label: 'Meters' },
    { value: 'cm', label: 'Centimeters' },
];

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.image = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);

        addActivity('updated', 'Product image uploaded');
    }
};

const removeImage = () => {
    form.image = null;
    imagePreview.value = null;
    document.getElementById('image').value = '';

    addActivity('updated', 'Product image removed');
};

const submit = () => {
    emit('submit', form);
};

const cancel = () => {
    emit('cancel');
};

const margin = computed(() => {
    const sale = parseFloat(form.sale_price) || 0;
    const cost = parseFloat(form.cost_price) || 0;
    if (sale && cost) {
        return ((sale - cost) / sale * 100).toFixed(2);
    }
    return 0;
});

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)} hours ago`;
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};

const getActivityIcon = (type) => {
    const icons = {
        'created': 'M12 6v6m0 0v6m0-6h6m-6 0H6',
        'updated': 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
        'note': 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
        'status': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    return icons[type] || icons.note;
};

const getActivityColor = (type) => {
    const colors = {
        'created': 'text-green-600 bg-green-100',
        'updated': 'text-blue-600 bg-blue-100',
        'note': 'text-gray-600 bg-gray-100',
        'status': 'text-purple-600 bg-purple-100'
    };
    return colors[type] || colors.note;
};

const addActivity = (type, message, details = '') => {
    const newActivity = {
        id: Date.now(),
        type: type,
        user: 'Current User',
        message: message,
        timestamp: new Date().toISOString(),
        details: details
    };

    activityList.value.unshift(newActivity);
};

const addNote = () => {
    if (!newNote.value.trim()) return;

    addActivity('note', newNote.value.trim());
    newNote.value = '';
    isAddingNote.value = false;
};

const cancelNote = () => {
    newNote.value = '';
    isAddingNote.value = false;
};
const inventoryItems = getInventoryNavItems();

</script>

<template>
    <Head title="Create Product" />

    <MainLayout :nav-items="inventoryItems">
        <div class="flex flex-col gap-6 px-10 mt-5 lg:flex-row">
            <div class="flex-1 overflow-hidden bg-white rounded-lg shadow-sm">
                <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-xl font-semibold text-gray-900">
                                {{ product.id ? 'Edit Product' : 'New Product' }}
                            </h2>
                            <p class="mt-1 text-sm text-gray-600">
                                Fill in the information below to {{ product.id ? 'update' : 'create' }} a product
                            </p>
                        </div>
                        <div class="flex space-x-3">
                            <button @click="cancel" type="button"
                                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Cancel
                            </button>
                            <button @click="submit" type="button" :disabled="form.processing"
                                class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                                {{ form.processing ? 'Saving...' : (product.id ? 'Update' : 'Create') }}
                            </button>
                        </div>
                    </div>
                </div>

                <TabContainer v-model="activeTab" variant="default" size="md">
                    <template #tabs>
                        <TabItem
                            id="general"
                            label="General Information"
                        />
                        <TabItem
                            id="pricing"
                            label="Pricing & Inventory"
                        />
                        <TabItem
                            id="details"
                            label="Additional Details"
                        />
                    </template>

                    <template #content>
                        <div class="p-6">
                            <TabPanel id="general">
                                <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                    <div class="lg:col-span-1">
                                        <ImageField
                                            id="product_image"
                                            v-model="imagePreview"
                                            label="Product Image"
                                            @file-selected="handleImageSelected"
                                        />
                                    </div>
                                    <div class="space-y-4 lg:col-span-2">
                                        <TextInputField
                                            id="name"
                                            v-model="form.name"
                                            label="Product Name"
                                            :required="true"
                                            :error="form.errors.name"
                                        />

                                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <TextInputField
                                                id="internal_reference"
                                                v-model="form.internal_reference"
                                                label="Internal Reference"
                                            />
                                            <TextInputField
                                                id="barcode"
                                                v-model="form.barcode"
                                                label="Barcode"
                                            />
                                        </div>

                                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <SelectField
                                                id="category_id"
                                                v-model="form.category_id"
                                                label="Category"
                                                :options="categoriesForSelect"
                                                placeholder="Select Category"
                                                :required="true"
                                                :error="form.errors.category_id"
                                            />
                                            <SelectField
                                                id="supplier_id"
                                                v-model="form.supplier_id"
                                                label="Supplier"
                                                :options="suppliersForSelect"
                                                placeholder="Select Supplier"
                                            />
                                        </div>

                                        <div class="grid grid-cols-1 gap-4">
                                            <TextAreaField
                                                id="description"
                                                v-model="form.description"
                                                label="Description"
                                                rows="3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel id="pricing">
                                <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                        <MonetoryField
                                            id="internal_reference"
                                            v-model="form.internal_reference"
                                            label="Unit Price"
                                        />
                                        <MonetoryField
                                            id="barcode"
                                            v-model="form.barcode"
                                            label="Unit Cost"
                                        />
                                </div>
                            </TabPanel>
                        </div>
                    </template>
                </TabContainer>

                <div class="p-6">

                    <!-- Pricing & Inventory Tab -->
                    <div v-show="activeTab === 'pricing'" class="space-y-6">
                        <!-- Pricing -->
                        <div class="p-4 rounded-lg bg-gray-50">
                            <h4 class="mb-4 text-sm font-medium text-gray-900">Pricing</h4>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label for="sale_price" class="block text-sm font-medium text-gray-700">
                                        Sale Price *
                                    </label>
                                    <div class="relative mt-1 rounded-md shadow-sm">
                                        <div
                                            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <span class="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input id="sale_price" v-model="form.sale_price" type="number" step="0.01"
                                            min="0" required
                                            class="block w-full border-gray-300 rounded-md shadow-sm pl-7 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            :class="{ 'border-red-300': form.errors.sale_price }" />
                                    </div>
                                    <p v-if="form.errors.sale_price" class="mt-1 text-sm text-red-600">
                                        {{ form.errors.sale_price }}
                                    </p>
                                </div>
                                <div>
                                    <label for="cost_price" class="block text-sm font-medium text-gray-700">
                                        Cost Price
                                    </label>
                                    <div class="relative mt-1 rounded-md shadow-sm">
                                        <div
                                            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <span class="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input id="cost_price" v-model="form.cost_price" type="number" step="0.01"
                                            min="0"
                                            class="block w-full border-gray-300 rounded-md shadow-sm pl-7 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">
                                        Margin %
                                    </label>
                                    <div
                                        class="px-3 py-2 mt-1 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md">
                                        {{ margin }}%
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4">
                                <label for="tax_rate" class="block text-sm font-medium text-gray-700">
                                    Tax Rate (%)
                                </label>
                                <input id="tax_rate" v-model="form.tax_rate" type="number" step="0.01" min="0" max="100"
                                    class="block w-32 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                        </div>

                        <!-- Inventory -->
                        <div class="p-4 rounded-lg bg-gray-50">
                            <h4 class="mb-4 text-sm font-medium text-gray-900">Inventory Management</h4>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label for="initial_stock" class="block text-sm font-medium text-gray-700">
                                        Initial Stock
                                    </label>
                                    <input id="initial_stock" v-model="form.initial_stock" type="number" min="0"
                                        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label for="min_stock" class="block text-sm font-medium text-gray-700">
                                        Minimum Stock
                                    </label>
                                    <input id="min_stock" v-model="form.min_stock" type="number" min="0"
                                        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label for="max_stock" class="block text-sm font-medium text-gray-700">
                                        Maximum Stock
                                    </label>
                                    <input id="max_stock" v-model="form.max_stock" type="number" min="0"
                                        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Additional Details Tab -->
                    <div v-show="activeTab === 'details'" class="space-y-6">
                        <!-- Unit & Measurements -->
                        <div class="p-4 rounded-lg bg-gray-50">
                            <h4 class="mb-4 text-sm font-medium text-gray-900">Unit & Measurements</h4>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label for="unit" class="block text-sm font-medium text-gray-700">
                                        Unit of Measure
                                    </label>
                                    <select id="unit" v-model="form.unit"
                                        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option v-for="unit in units" :key="unit.value" :value="unit.value">
                                            {{ unit.label }}
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label for="weight" class="block text-sm font-medium text-gray-700">
                                        Weight (kg)
                                    </label>
                                    <input id="weight" v-model="form.weight" type="number" step="0.01" min="0"
                                        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label for="dimensions" class="block text-sm font-medium text-gray-700">
                                        Dimensions (L×W×H)
                                    </label>
                                    <input id="dimensions" v-model="form.dimensions" type="text"
                                        placeholder="e.g., 10×5×3 cm"
                                        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                        </div>

                        <!-- Status -->
                        <div class="p-4 rounded-lg bg-gray-50">
                            <h4 class="mb-4 text-sm font-medium text-gray-900">Status</h4>
                            <div>
                                <label for="status" class="block text-sm font-medium text-gray-700">
                                    Product Status
                                </label>
                                <select id="status" v-model="form.status"
                                    class="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:w-48 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Chatter/Activity Logger Sidebar -->
            <div class="w-full overflow-hidden bg-white rounded-lg shadow-sm lg:w-96">
                <!-- Chatter Header -->
                <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
                    <div class="flex items-center justify-between">
                        <h3 class="flex items-center text-sm font-medium text-gray-900">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Activity Log
                        </h3>
                        <button @click="isAddingNote = !isAddingNote"
                            class="px-2 py-1 text-xs text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Add Note
                        </button>
                    </div>
                </div>

                <!-- Add Note Form -->
                <div v-if="isAddingNote" class="p-4 border-b border-gray-200 bg-blue-50">
                    <div class="space-y-3">
                        <textarea v-model="newNote" rows="3" placeholder="Add a note about this product..."
                            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                        <div class="flex justify-end space-x-2">
                            <button @click="cancelNote"
                                class="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                                Cancel
                            </button>
                            <button @click="addNote" :disabled="!newNote.trim()"
                                class="px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
                                Add Note
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Activity List -->
                <div class="flex-1 overflow-y-auto max-h-96 lg:max-h-screen">
                    <div class="p-4 space-y-4">
                        <div v-for="activity in activityList" :key="activity.id" class="flex items-start space-x-3">
                            <!-- Activity Icon -->
                            <div
                                :class="['flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center', getActivityColor(activity.type)]">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        :d="getActivityIcon(activity.type)" />
                                </svg>
                            </div>

                            <!-- Activity Content -->
                            <div class="flex-1 min-w-0">
                                <div class="text-sm">
                                    <span class="font-medium text-gray-900">{{ activity.user }}</span>
                                    <span class="ml-1 text-gray-600">{{ activity.message }}</span>
                                </div>
                                <div v-if="activity.details" class="p-2 mt-1 text-xs text-gray-500 rounded bg-gray-50">
                                    {{ activity.details }}
                                </div>
                                <div class="mt-1 text-xs text-gray-400">
                                    {{ formatTimestamp(activity.timestamp) }}
                                </div>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div v-if="activityList.length === 0" class="py-8 text-center">
                            <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <h3 class="mt-2 text-sm font-medium text-gray-900">No activity yet</h3>
                            <p class="mt-1 text-sm text-gray-500">Activity will appear here as you make changes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>
