import { shallowMount } from "@vue/test-utils";
import MainList from "../../src/components/MainList.vue";
import { Multiselect } from "vue-multiselect";

describe("MainList.vue", () => {
  const wrapper = shallowMount(MainList);

  it("render nodes", () => {
    expect(wrapper.html()).toContain("<ul>");
  });

  it("trigger vue-multiselect emit", () => {
    const multiselect = wrapper.findComponent(Multiselect);
    multiselect.vm.$emit("open");
  });
});
