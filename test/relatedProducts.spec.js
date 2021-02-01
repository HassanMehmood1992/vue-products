import { mount } from "@vue/test-utils";

import relatedProducts from "@/components/relatedProducts";

describe("Product Details Card", () => {
  test("should contain brand name", async () => {
    const wrapper = mount(relatedProducts, {
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
    const title = wrapper.find(".caption.accent--text");
    expect(title.element.innerHTML.trim()).toBe("test brand");
    wrapper.destroy();
  });
});
