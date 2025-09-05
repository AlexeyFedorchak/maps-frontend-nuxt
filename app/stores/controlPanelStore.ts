import { ref } from 'vue';

export const CONTROL_PANEL_TAB = {
    TAB_1: 'tab-1',
    TAB_2: 'tab-2',
} as const;

export type ControlPanelTab = typeof CONTROL_PANEL_TAB[keyof typeof CONTROL_PANEL_TAB];
export type ControlPanelTabs = [ControlPanelTab, ControlPanelTab];

export const useControlPanelStore = defineStore('controlPanelStore', () => {
    const tabs = ref<ControlPanelTabs>([CONTROL_PANEL_TAB.TAB_1, CONTROL_PANEL_TAB.TAB_2]);
    const activeTab = ref<ControlPanelTab>(CONTROL_PANEL_TAB.TAB_1);

    function setActiveTab(tab: ControlPanelTab) {
        activeTab.value = tab;
    }

    return {
        // State
        tabs,
        activeTab,
        // Actions
        setActiveTab,
    };
});
