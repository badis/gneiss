import { expect } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useLocalStorage } from "./use-local-storage";

const originalError = console.error;

beforeAll(() => {
  console.error = jest.fn(); // Mock console.error
});

afterAll(() => {
  console.error = originalError; // Restore console.error to its original state
});

describe("Custom Hooks", () => {
  describe("useLocalStorage", () => {
    it("Should throw an exception if key is empty", () => {
      expect(() => {
        renderHook(useLocalStorage);
      }).toThrowError("Custom hooks > useLocalStorage: missing key");

      expect(console.error).toHaveBeenCalled();
    });

    it("Should return empty value initially", () => {
      const key = "testkey";
      const { result } = renderHook(useLocalStorage, {
        initialProps: key,
      });
      expect(result.current.value).toBeFalsy();
    });

    it("Should set a value", () => {
      const key = "testkey";
      const { result } = renderHook(useLocalStorage, {
        initialProps: key,
      });
      act(() => {
        result.current.setValue("testvalue");
      });
      expect(result.current.value).toBe("testvalue");
    });

    it("Should remove a value", () => {
      const key = "testkey";
      const { result } = renderHook(useLocalStorage, {
        initialProps: key,
      });
      act(() => {
        result.current.removeValue();
      });
      expect(result.current.value).toBeFalsy();
    });
  });
});
