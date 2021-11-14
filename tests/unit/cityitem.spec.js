import { shallowMount } from "@vue/test-utils";
import CityItem from "../../src/components/CityItem.vue";

describe("MainList.vue", () => {
  const wrapper = shallowMount(CityItem, {
    propsData: {
      city: {
        address: {
          city: "Moscow",
          country: "Russia",
          county: "Moscow",
          postalCode: "125009",
          state: "Central Federal District",
        },
      },
    },
  });

  it("render nodes", () => {
    expect(wrapper.html()).toContain("<li>");
  });

  it("emit a delete event", async () => {
    await wrapper.find("button.main-btn").trigger("click");
    wrapper.vm.$emit("deleteItem");

    await wrapper.vm.$nextTick();
  });

  it("should call delete function", async () => {
    const spy = (wrapper.vm.deleteCity = jest.fn());
    await wrapper.find("button.main-btn").trigger("click");
    expect(spy).toHaveBeenCalled();
  });
});
