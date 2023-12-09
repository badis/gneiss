import { expect } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { useSession } from "./use-session";
import { GET_CURRENT_USER } from "../api/graphql/auth";

const MOCKED_DATA = {
  session: {
    currentUser: {
      id: 1,
      username: "testuser",
      response: null,
    },
  },
};

const mocks = [
  {
    request: {
      query: GET_CURRENT_USER,
    },
    result: {
      data: MOCKED_DATA,
    },
  },
  // Add more mocks for different scenarios if needed
];

describe("Custom Hooks", () => {
  describe("useSession", () => {
    it("useSession returns data from GraphQL query", async () => {
      const { result } = renderHook(() => useSession());
      // Optionally, wait for the next update if your hook has async behavior
      // Assert that your hook returns the expected data
      expect(result.current.session.loading).toBe(false);
      expect(result.current.session.currentUser).toEqual(
        MOCKED_DATA.session.currentUser
      );
    });
  });
});
