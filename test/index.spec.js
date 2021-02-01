import { mount, createLocalVue } from "@vue/test-utils";
import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";

import Index from "@/pages/index";

const localVue = createLocalVue();
localVue.use(Vuex);

let wrapper;

beforeEach(() => {
  let vuetify = new Vuetify();

  wrapper = shallowMount(Index, {
    store: new Vuex.Store({
      state: { items: [], loading: false }
    }),
    localVue,
    vuetify,
    stubs: {
      NuxtLink: true,
      Nuxt: true
      // Any other component that you want stubbed
    }
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("Index/Index page", () => {
  test("is fully functional", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test("should have products title on the page", () => {
    const title = wrapper.find("#products");
    expect(title.element.innerHTML).toBe("Products");
  });

  test("should show error message if items are empty and not loading", () => {
    const wrapper = mount(Index, {
      data: () => ({
        items: [],
        loading: false
      }),
      computed: {
        reachedEnd: () => {
          return false;
        }
      }
    });
    const title = wrapper.find("#error-message");
    expect(title.element.innerHTML.length > 0).toBeTruthy();
    expect(title.element.innerHTML.length).toBeGreaterThan(0);
    wrapper.destroy()
  });
});
