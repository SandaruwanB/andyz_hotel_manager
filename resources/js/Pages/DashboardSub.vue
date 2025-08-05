<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';

const currentDate = ref(new Date());
const selectedDate = ref(new Date());
const viewMode = ref('month');


const rooms = ref([
    { id: 1, number: '101', type: 'Standard', capacity: 2, status: 'available' },
    { id: 2, number: '102', type: 'Standard', capacity: 2, status: 'occupied' },
    { id: 3, number: '103', type: 'Deluxe', capacity: 3, status: 'available' },
    { id: 4, number: '104', type: 'Deluxe', capacity: 3, status: 'maintenance' },
    { id: 5, number: '201', type: 'Suite', capacity: 4, status: 'occupied' },
    { id: 6, number: '202', type: 'Suite', capacity: 4, status: 'available' },
    { id: 7, number: '203', type: 'Standard', capacity: 2, status: 'cleaning' },
    { id: 8, number: '204', type: 'Deluxe', capacity: 3, status: 'occupied' },
]);


const bookings = ref([
    {
        id: 1,
        room_id: 2,
        guest_name: 'John Smith',
        check_in: '2025-08-04',
        check_out: '2025-08-07',
        status: 'confirmed',
        guests: 2
    },
    {
        id: 2,
        room_id: 5,
        guest_name: 'Sarah Johnson',
        check_in: '2025-08-03',
        check_out: '2025-08-06',
        status: 'checked_in',
        guests: 3
    },
    {
        id: 3,
        room_id: 8,
        guest_name: 'Mike Wilson',
        check_in: '2025-08-05',
        check_out: '2025-08-08',
        status: 'confirmed',
        guests: 2
    },
    {
        id: 4,
        room_id: 1,
        guest_name: 'Emma Davis',
        check_in: '2025-08-06',
        check_out: '2025-08-09',
        status: 'pending',
        guests: 1
    },
    {
        id: 5,
        room_id: 3,
        guest_name: 'Robert Brown',
        check_in: '2025-08-07',
        check_out: '2025-08-10',
        status: 'confirmed',
        guests: 2
    }
]);

// Calendar calculations
const calendarDays = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
        const dayBookings = getBookingsForDate(current);
        days.push({
            date: new Date(current),
            isCurrentMonth: current.getMonth() === month,
            isToday: isToday(current),
            bookings: dayBookings,
            availableRooms: getAvailableRoomsForDate(current),
            occupiedRooms: getOccupiedRoomsForDate(current)
        });
        current.setDate(current.getDate() + 1);
    }

    return days;
});

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const currentMonth = computed(() => {
    return monthNames[currentDate.value.getMonth()];
});

const currentYear = computed(() => {
    return currentDate.value.getFullYear();
});

const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
};

const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

const getBookingsForDate = (date) => {
    const dateStr = formatDate(date);
    return bookings.value.filter(booking => {
        const checkIn = new Date(booking.check_in);
        const checkOut = new Date(booking.check_out);
        const currentDate = new Date(dateStr);

        return currentDate >= checkIn && currentDate < checkOut;
    });
};

const getAvailableRoomsForDate = (date) => {
    const dateBookings = getBookingsForDate(date);
    const bookedRoomIds = dateBookings.map(booking => booking.room_id);
    return rooms.value.filter(room =>
        !bookedRoomIds.includes(room.id) && room.status === 'available'
    ).length;
};

const getOccupiedRoomsForDate = (date) => {
    return getBookingsForDate(date).length;
};

const getRoomByBooking = (booking) => {
    return rooms.value.find(room => room.id === booking.room_id);
};

const getStatusColor = (status) => {
    const colors = {
        'confirmed': 'bg-blue-100 text-blue-800',
        'checked_in': 'bg-green-100 text-green-800',
        'pending': 'bg-yellow-100 text-yellow-800',
        'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

const getRoomStatusColor = (status) => {
    const colors = {
        'available': 'bg-green-500',
        'occupied': 'bg-red-500',
        'maintenance': 'bg-orange-500',
        'cleaning': 'bg-blue-500'
    };
    return colors[status] || 'bg-gray-500';
};

// Navigation functions
const previousMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1);
};

const nextMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1);
};

const goToToday = () => {
    currentDate.value = new Date();
};

// Statistics
const todayStats = computed(() => {
    const today = new Date();
    const todayBookings = getBookingsForDate(today);
    const checkIns = bookings.value.filter(booking =>
        formatDate(new Date(booking.check_in)) === formatDate(today)
    );
    const checkOuts = bookings.value.filter(booking =>
        formatDate(new Date(booking.check_out)) === formatDate(today)
    );

    return {
        totalRooms: rooms.value.length,
        occupiedRooms: todayBookings.length,
        availableRooms: rooms.value.filter(room => room.status === 'available').length - todayBookings.length,
        checkIns: checkIns.length,
        checkOuts: checkOuts.length,
        occupancyRate: Math.round((todayBookings.length / rooms.value.length) * 100)
    };
});
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="py-8">
            <div class="sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                    <div class="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Total Rooms</p>
                                <p class="text-2xl font-semibold text-gray-900">{{ todayStats.totalRooms }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Occupied Rooms</p>
                                <p class="text-2xl font-semibold text-gray-900">{{ todayStats.occupiedRooms }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Available Rooms</p>
                                <p class="text-2xl font-semibold text-gray-900">{{ todayStats.availableRooms }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="flex items-center justify-center w-8 h-8 bg-purple-500 rounded-full">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Occupancy Rate</p>
                                <p class="text-2xl font-semibold text-gray-900">{{ todayStats.occupancyRate }}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div class="lg:col-span-2">
                        <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="text-lg font-medium text-gray-900">Room Booking Calendar</h3>
                                        <p class="text-sm text-gray-600">{{ currentMonth }} {{ currentYear }}</p>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <button
                                            @click="goToToday"
                                            class="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            Today
                                        </button>
                                        <button
                                            @click="previousMonth"
                                            class="p-1 text-gray-400 hover:text-gray-600"
                                        >
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            @click="nextMonth"
                                            class="p-1 text-gray-400 hover:text-gray-600"
                                        >
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="p-6">
                                <div class="grid grid-cols-7 gap-1 mb-2">
                                    <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
                                         :key="day"
                                         class="py-2 text-sm font-medium text-center text-gray-700">
                                        {{ day }}
                                    </div>
                                </div>

                                <div class="grid grid-cols-7 gap-1">
                                    <div
                                        v-for="day in calendarDays"
                                        :key="day.date.toISOString()"
                                        :class="[
                                            'min-h-[100px] p-2 border border-gray-200 rounded-lg transition-colors cursor-pointer',
                                            day.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400',
                                            day.isToday ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                                        ]"
                                        @click="selectedDate = day.date"
                                    >
                                        <div class="flex items-center justify-between mb-1">
                                            <span :class="[
                                                'text-sm font-medium',
                                                day.isToday ? 'text-blue-600' : day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                                            ]">
                                                {{ day.date.getDate() }}
                                            </span>
                                            <div v-if="day.occupiedRooms > 0" class="flex items-center space-x-1">
                                                <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                                                <span class="text-xs text-gray-600">{{ day.occupiedRooms }}</span>
                                            </div>
                                        </div>

                                        <div class="space-y-1">
                                            <div v-if="day.availableRooms > 0" class="flex items-center text-xs text-green-600">
                                                <div class="w-2 h-2 mr-1 bg-green-500 rounded-full"></div>
                                                {{ day.availableRooms }} available
                                            </div>
                                            <div v-if="day.occupiedRooms > 0" class="flex items-center text-xs text-red-600">
                                                <div class="w-2 h-2 mr-1 bg-red-500 rounded-full"></div>
                                                {{ day.occupiedRooms }} occupied
                                            </div>
                                        </div>

                                        <div class="mt-1 space-y-1">
                                            <div
                                                v-for="booking in day.bookings.slice(0, 2)"
                                                :key="booking.id"
                                                class="text-xs px-1 py-0.5 rounded bg-blue-100 text-blue-800 truncate"
                                            >
                                                {{ getRoomByBooking(booking)?.number }} - {{ booking.guest_name }}
                                            </div>
                                            <div v-if="day.bookings.length > 2" class="text-xs text-gray-500">
                                                +{{ day.bookings.length - 2 }} more
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div class="px-6 py-4 border-b border-gray-200">
                                <h3 class="text-lg font-medium text-gray-900">Today's Activity</h3>
                            </div>
                            <div class="p-6 space-y-4">
                                <div>
                                    <h4 class="mb-2 text-sm font-medium text-gray-900">Check-ins ({{ todayStats.checkIns }})</h4>
                                    <div class="space-y-2">
                                        <div
                                            v-for="booking in bookings.filter(b => formatDate(new Date(b.check_in)) === formatDate(new Date()))"
                                            :key="'checkin-' + booking.id"
                                            class="flex items-center justify-between p-2 rounded-lg bg-green-50"
                                        >
                                            <div>
                                                <p class="text-sm font-medium text-gray-900">{{ booking.guest_name }}</p>
                                                <p class="text-xs text-gray-600">Room {{ getRoomByBooking(booking)?.number }}</p>
                                            </div>
                                            <span :class="['px-2 py-1 text-xs font-medium rounded-full', getStatusColor(booking.status)]">
                                                {{ booking.status }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 class="mb-2 text-sm font-medium text-gray-900">Check-outs ({{ todayStats.checkOuts }})</h4>
                                    <div class="space-y-2">
                                        <div
                                            v-for="booking in bookings.filter(b => formatDate(new Date(b.check_out)) === formatDate(new Date()))"
                                            :key="'checkout-' + booking.id"
                                            class="flex items-center justify-between p-2 rounded-lg bg-orange-50"
                                        >
                                            <div>
                                                <p class="text-sm font-medium text-gray-900">{{ booking.guest_name }}</p>
                                                <p class="text-xs text-gray-600">Room {{ getRoomByBooking(booking)?.number }}</p>
                                            </div>
                                            <span :class="['px-2 py-1 text-xs font-medium rounded-full', getStatusColor(booking.status)]">
                                                {{ booking.status }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div class="px-6 py-4 border-b border-gray-200">
                                <h3 class="text-lg font-medium text-gray-900">Room Status</h3>
                            </div>
                            <div class="p-6">
                                <div class="space-y-3">
                                    <div
                                        v-for="room in rooms"
                                        :key="room.id"
                                        class="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                                    >
                                        <div class="flex items-center">
                                            <div :class="['w-3 h-3 rounded-full mr-3', getRoomStatusColor(room.status)]"></div>
                                            <div>
                                                <p class="text-sm font-medium text-gray-900">Room {{ room.number }}</p>
                                                <p class="text-xs text-gray-600">{{ room.type }} • {{ room.capacity }} guests</p>
                                            </div>
                                        </div>
                                        <span class="text-xs font-medium text-gray-600 capitalize">
                                            {{ room.status.replace('_', ' ') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div class="px-6 py-4 border-b border-gray-200">
                                <h3 class="text-lg font-medium text-gray-900">Legend</h3>
                            </div>
                            <div class="p-6 space-y-3">
                                <div class="flex items-center">
                                    <div class="w-3 h-3 mr-3 bg-green-500 rounded-full"></div>
                                    <span class="text-sm text-gray-700">Available</span>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-3 h-3 mr-3 bg-red-500 rounded-full"></div>
                                    <span class="text-sm text-gray-700">Occupied</span>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-3 h-3 mr-3 bg-orange-500 rounded-full"></div>
                                    <span class="text-sm text-gray-700">Maintenance</span>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-3 h-3 mr-3 bg-blue-500 rounded-full"></div>
                                    <span class="text-sm text-gray-700">Cleaning</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
