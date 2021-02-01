import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";

import Welcome from "@/components/welcome";

const localVue = createLocalVue();
localVue.use(Vuex);

let wrapper;

beforeEach(() => {
  let vuetify = new Vuetify();

  wrapper = mount(Welcome, {
    store: new Vuex.Store({
      state: { products: [] }
    }),
    localVue,
    vuetify,
    stubs: ["router-link"]
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("Welcome component", () => {
  test("is fully functional", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  test("should have welcome title", () => {
    const title = wrapper.find(".py-3.welcome.primary--text");

    expect(title.element.innerHTML).toBe("Welcome To Shophub");
  });

  test("should render sub title", () => {
    const title = wrapper.find(".text-h6");
    expect(title.element.innerHTML).toBe(
      "Enjoy our favorite products ! Its Awesome"
    );
  });
});
