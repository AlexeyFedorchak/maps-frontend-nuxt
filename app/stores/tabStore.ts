import { ref } from 'vue';

type PageName = string;
type Tab = string;
type Tabs = Tab[];

/**
 * @description
 * This store save tabs.
 * @example
 * const tabStore = useTabStore();
 * const {
 *   activeTab,
 * } = useNavigationTabs(navigationStore, 'page1', ['tab1', 'tab2']);
 * // Set active tab
 * activeTab.value = 'tab2';
 * // Get active tab
 * const active = activeTab.value;
 * */
export const useTabStore = defineStore('tabStore', () => {
    const tabs = ref<Record<PageName, Tabs>>({});
    const activeTab = ref<Record<PageName, Tab>>({});

    function setActiveTab(pageName: string, tab: Tab) {
        activeTab.value = {
            ...activeTab.value,
            [pageName]: tab,
        };
    }

    function setTabs(pageName: string, tabsConfig: Tabs) {
        tabs.value = {
            ...tabs.value,
            [pageName]: tabsConfig,
        };
    }

    return {
        // State
        tabs,
        activeTab,
        // Actions
        setActiveTab,
        setTabs,
    };
});
