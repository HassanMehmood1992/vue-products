import { mount } from "@vue/test-utils";

import productCard from "@/components/productCard";

describe("Product Card", () => {
  test("should contain name", async () => {
    const wrapper = mount(productCard, {
      stubs: ["router-link"],
      propsData: {
        product: {
          name: "test",
          image: { hash: "ahdwui27h9hadwiu" },
          brand: { name: "test brand" },
          old_price: 123123
        }
      }
    });
    const title = wrapper.find(".line-height-150");
    expect(title.element.innerHTML.trim()).toBe("test");
    wrapper.destroy();
  });

  test("should contain brand name", async () => {
    const wrapper = mount(productCard, {
      propsData: {
        product: {
          name: "test",
          image: { hash: "ahdwui27h9hadwiu" },
          brand: { name: "test brand" },
          old_price: 123123
        }
      }
    });
    const title = wrapper.find(".subtitle-1.accent--text");
    expect(title.element.innerHTML.trim()).toBe("test brand");
    wrapper.destroy();
  });
});
