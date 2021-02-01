import { mount } from "@vue/test-utils";

import productDetails from "@/components/productDetails";

describe("Product Details Card", () => {
  test("should contain brand name", async () => {
    const wrapper = mount(productDetails, {
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
    const title = wrapper.find(".text-h6.accent--text");
    expect(title.element.innerHTML.trim()).toBe("test brand");
    wrapper.destroy();
  });

  test("should check if the product is in stock", async () => {
    const wrapper = mount(productDetails, {
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
    const title = wrapper.find(".font-weight-medium.accent--text");
    expect(title.element.innerHTML.trim()).toBe("In stock");
    wrapper.destroy();
  });
});
