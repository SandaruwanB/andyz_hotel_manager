<script setup>
import { ref, computed } from 'vue';
import { useForm, Head } from '@inertiajs/vue3';
import MainLayout from '@/Layouts/MainLayout.vue';
import { getInventoryNavItems, navigationItems } from '@/@types/NavItems';
import TabContainer from '@/Components/tab/TabContainer.vue';
import TabItem from '@/Components/tab/TabItem.vue';
import { TabPanel } from '@/Components/tab';
import { ImageField, MonetoryField, SelectField, TextAreaField, TextInputField } from '@/Components/form';
import { LoggerContainer } from '@/Components/logger';
import Checkbox from '@/Components/Checkbox.vue';

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
    can_be_sold: props.product?.can_be_sold || false,
    can_be_purchased: props.product?.can_be_purchased || false,
    image: null,
});

const imagePreview = ref(props.product?.image || null);
const activeTab = ref('general');

const activityList = ref([...props.activities]);

const submit = () => {
    emit('submit', form);
};

const cancel = () => {
    emit('cancel');
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

                <div class="p-6 border-b border-gray-200">
                    <div class="space-y-6">
                        <TextInputField
                            id="name"
                            v-model="form.name"
                            label="Product"
                            :required="true"
                            :error="form.errors.name"
                            placeholder="e.g. Coconut Powder"
                        />

                        <div class="flex items-center space-x-4">
                            <div class="flex items-center">
                                <Checkbox
                                    id="can_be_sold"
                                    :checked="form.can_be_sold"
                                    @update:checked="form.can_be_sold = $event"
                                />
                                <label for="can_be_sold" class="ml-2 text-sm font-medium text-gray-700">
                                    Sale
                                </label>
                            </div>

                            <div class="flex items-center">
                                <Checkbox
                                    id="can_be_purchased"
                                    :checked="form.can_be_purchased"
                                    @update:checked="form.can_be_purchased = $event"
                                />
                                <label for="can_be_purchased" class="ml-2 text-sm font-medium text-gray-700">
                                    Purchase
                                </label>
                            </div>
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
                            id="inventory"
                            label="Inventory"
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
                                                id="uom_id"
                                                v-model="form.category_id"
                                                label="Unit of Measure"
                                                :options="categoriesForSelect"
                                                placeholder="Select Unit of Measure"
                                                :required="true"
                                                :error="form.errors.category_id"
                                            />
                                        </div>
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
                            <TabPanel id="inventory">
                                <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                    <TextInputField
                                        id="internal_reference"
                                        v-model="form.internal_reference"
                                        label="Weight"
                                    />
                                    <TextInputField
                                        id="barcode"
                                        v-model="form.barcode"
                                        label="Reordering Level"
                                    />
                                </div>
                            </TabPanel>
                        </div>
                    </template>
                </TabContainer>
            </div>

            <LoggerContainer
                ref="chatterRef"
                title="Product Activity"
                :activities="activities"
                entity-type="product"
                :entity-id="product.id"
                @note-added="handleNoteAdded"
                @activity-added="handleActivityAdded"
            />
        </div>
    </MainLayout>
</template>
