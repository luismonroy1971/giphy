import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { AddCategory } from "../../components/AddCategory";

describe("Pruebas en <AddCategory />", () => {
  const setCategories = jest.fn();
  let wrapper = shallow(<AddCategory setCategories={setCategories} />);

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<AddCategory setCategories={setCategories} />);
  });

  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("debe de cambiar la caja de texto", () => {
    const input = wrapper.find("input");
    const value = "Hola mundo";
    input.simulate("change", { target: { value } });
    expect(wrapper.find("p").text().trim()).toBe(value);
  });
  test("No debe de postear la información con Submit", () => {
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(setCategories).not.toHaveBeenCalled();
  });
  test("debe de llamar el setCategories y limpiar la caja de texto ", () => {
    const value = "Hola mundo";
    const input = wrapper
      .find("input")
      .simulate("change", { target: { value } });
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(setCategories).toHaveBeenCalled(); // Que se haya llamado
    expect(setCategories).toHaveBeenCalledTimes(1); // Que se haya llamado una vez
    expect(setCategories).toHaveBeenCalledWith(expect.any(Function)); // Que se haya llamado como una función
    expect(wrapper.find("input").prop("value")).toBe(""); // Que el input se reinicie (vacío)
  });
});
