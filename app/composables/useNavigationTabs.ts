import { useTabStore } from '~/stores';

export const useNavigationTabs = (tabStore: ReturnType<typeof useTabStore>, pageName: string, tabs: string[]) => {
    const activeTab = computed({
        get() {
            return tabStore.activeTab[pageName];
        },
        set(newValue: string) {
            tabStore.setActiveTab(pageName, newValue);
        },
    });

    onMounted(() => {
        tabStore.setTabs(pageName, tabs);
    });

    return {
        activeTab,
    };
};
