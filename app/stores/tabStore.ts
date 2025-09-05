import { ref } from 'vue';

type ConfigName = string;
type Tab = string;
type Tabs = Tab[];

/**
 * @description
 * This store save tabs.
 * @example
 * const tabStore = useTabStore();
 * const {
 *   activeTab,
 * } = useNavigationTabs(navigationStore, 'configName', ['tab1', 'tab2']);
 * // Set active tab
 * activeTab.value = 'tab2';
 * // Get active tab
 * const active = activeTab.value;
 * */
export const useTabStore = defineStore('tabStore', () => {
    const tabs = ref<Record<ConfigName, Tabs>>({});
    const activeTab = ref<Record<ConfigName, Tab>>({});

    function getTabs(configName: ConfigName): string[] {
        return tabs.value[configName]!;
    }

    function setActiveTab(configName: ConfigName, tab: Tab) {
        activeTab.value = {
            ...activeTab.value,
            [configName]: tab,
        };
    }

    function setTabs(configName: ConfigName, tabsConfig: Tabs) {
        tabs.value = {
            ...tabs.value,
            [configName]: tabsConfig,
        };
    }

    return {
        // State
        tabs,
        getTabs,
        activeTab,
        // Actions
        setActiveTab,
        setTabs,
    };
});
