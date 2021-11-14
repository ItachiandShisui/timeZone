import { shallowMount } from "@vue/test-utils";
import Dashboard from "@/pages/Dashboard.vue";

describe("Dashboard.vue", () => {
  const wrapper = shallowMount(Dashboard);

  it("render nodes", () => {
    expect(wrapper.html()).toContain("<h1>Time Zone converter</h1>");
    expect(wrapper.html()).toContain('<div class="dashboard-header">');
  });

  it("check that functions have been called", async () => {
    const spy = (wrapper.vm.refreshTime = jest.fn());
    await wrapper.vm.$nextTick();
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
    }, 0);
  });
});
