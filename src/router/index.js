import { createRouter, createWebHistory } from 'vue-router'
import OnboardingPage from '@/views/OnboardingPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import TaskPage from '@/views/TasksPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import WalletPage from '@/views/WalletPage.vue'
import ReferralPage from '@/views/ReferralPage.vue'
import SupportPage from '@/views/SupportChatPage.vue'
import WalletHistory from '@/views/WalletHistoryView.vue'
import TaskDetails from '@/views/TaskDetailsPage.vue'
import SettingsPage from '@/views/SettingsPage.vue'
import HelpPage from '@/views/settings/HelpPage.vue'
import PrivacyPage from '@/views/settings/PrivacyPage.vue'
import NotificationsPage from '@/views/settings/NotificationsPage.vue'
import PasswordPage from '@/views/settings/PasswordPage.vue'
import EditProfile from '@/views/Profile/EditProfile.vue'
import UpgradePlans from '@/views/UpgradePlans.vue'
import PaymentSuccess from '@/views/PaymentSuccess.vue'
import Notifications from '@/views/NotificationsPage.vue'
import AdminTasks from '@/views/AdminTasks.vue'
import LeaderboardPage from '@/views/LeaderboardPage.vue'
import UnauthorizedPage from '@/views/UnauthorizedPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'onboarding',
      component: OnboardingPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: WalletPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/referral',
      name: 'referral',
      component: ReferralPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/support',
      name: 'support',
      component: SupportPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/wallet/history',
      name: 'wallet/history',
      component: WalletHistory,
      meta: { requiresAuth: true },
    },
    {
      path: '/tasks/:id',
      name: 'task-details',
      component: TaskDetails,
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/settings/help',
      name: 'settings/help',
      component: HelpPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/settings/privacy',
      name: 'settings/privacy',
      component: PrivacyPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/settings/notifications',
      name: 'settings/notifications',
      component: NotificationsPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/settings/password',
      name: 'settings/password',
      component: PasswordPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/edit',
      name: 'profile/edit',
      component: EditProfile,
      meta: { requiresAuth: true },
    },
    {
      path: '/upgrade',
      name: 'upgrade',
      component: UpgradePlans,
      meta: { requiresAuth: true },
    },
    {
      path: '/payment-success',
      name: 'paymentSuccess',
      component: PaymentSuccess,
      meta: { requiresAuth: true },
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: Notifications,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/tasks',
      name: 'admin/tasks',
      component: AdminTasks,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/403',
      name: 'unauthorized',
      component: UnauthorizedPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
    },
  ],

  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  const publicPages = ['/', '/login', '/register', '/403']

  // Require login for all non-public pages
  if (!publicPages.includes(to.path) && !token) {
    return next('/login')
  }

  // Prevent logged-in users from accessing auth pages
  if (
    token &&
    ['/', '/login', '/register'].includes(to.path)
  ) {
    return next('/dashboard')
  }

  // Admin protection
  if (to.meta.requiresAdmin && user?.role !== 'admin') {
    return next('/403')
  }

  next()
})

export default router
