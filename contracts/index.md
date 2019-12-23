An Index is a list of locators sorted by score. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/source/index).

# Structs

## `Entry`

```java
struct Entry {
  bytes32 locator;
  uint256 score;
  address prev;
  address next;
}
```

# Functions

## `constructor`

Create a new `Index` contract.

```java
constructor() public
```

## `setLocator`

Set an Locator on the Index.

```java
function setLocator(
  address identifier,
  uint256 score,
  bytes32 locator
) external onlyOwner
```

| Param        | Type      | Description                                          |
| :----------- | :-------- | :--------------------------------------------------- |
| `identifier` | `address` | On-chain address identifying the owner of a locator. |
| `score`      | `uint256` | Score for the locator being set.                     |
| `locator`    | `bytes32` | Locator.                                             |

A successful `setLocator` emits a `SetLocator` event.

```java
event SetLocator(
  address indexed identifier,
  uint256 score,
  bytes32 indexed locator
);
```

---

| Revert Reason          | Scenario                                            |
| :--------------------- | :-------------------------------------------------- |
| `ENTRY_ALREADY_EXISTS` | This address already has an Entry on the Index.     |
| `LOCATOR_MUST_BE_SENT` | Locator must not be empty to ensure list integrity. |

## `updateLocator`

Updates an existing Locator on the Index.

```java
function updateLocator(
  address identifier,
  uint256 score,
  bytes32 locator
) external onlyOwner
```

| Param        | Type      | Description                                          |
| :----------- | :-------- | :--------------------------------------------------- |
| `identifier` | `address` | On-chain address identifying the owner of a locator. |
| `score`      | `uint256` | Score for the locator being set.                     |
| `locator`    | `bytes32` | Locator.                                             |

A successful `updateLocator` emits a `SetLocator` event.

```java
event SetLocator(
  address indexed identifier,
  uint256 score,
  bytes32 indexed locator
);
```

---

| Revert Reason          | Scenario                                                                    |
| :--------------------- | :-------------------------------------------------------------------------- |
| `ENTRY_DOES_NOT_EXIST` | This address does not has an Entry on the Index and thus cannot be updated. |
| `LOCATOR_MUST_BE_SENT` | Locator must not be empty to ensure list integrity.                         |

## `unsetLocator`

Unset a Locator from the Index.

```java
function unsetLocator(
  address identifier
) external onlyOwner returns (bool) {
```

A successful `unsetLocator` emits an `UnsetLocator` event.

```java
event UnsetLocator(
  address event identifier
);
```

| Param        | Type      | Description                                          |
| :----------- | :-------- | :--------------------------------------------------- |
| `identifier` | `address` | On-chain address identifying the owner of a locator. |

---

| Revert Reason          | Scenario                                          |
| :--------------------- | :------------------------------------------------ |
| `ENTRY_DOES_NOT_EXIST` | This address does not have an Entry on the Index. |

## `getScore`

Gets the score for a given identifier.

```java
function getScore(
  address identifier
) external view returns (uint256)
```

| Param        | Type      | Description                                          |
| :----------- | :-------- | :--------------------------------------------------- |
| `identifier` | `address` | On-chain address identifying the owner of a locator. |

## `getLocator`

Gets the locator as bytes32 for a given identifier.

```java
function getLocator(
  address identifier
) external view returns (bytes32)
```

| Param        | Type      | Description                                          |
| :----------- | :-------- | :--------------------------------------------------- |
| `identifier` | `address` | On-chain address identifying the owner of a locator. |

## `getLocators`

Get a Range of Locators.

```java
function getLocators(
   address cursor,
   uint256 limit
) external view returns (bytes32[] memory locators, uint256[] memory scores, address nextCursor) {
```

| Param    | Type      | Description                           |
| :------- | :-------- | :------------------------------------ |
| `cursor` | `address` | Cursor to start with.                 |
| `limit`  | `uint256` | Maximum number of locators to return. |
