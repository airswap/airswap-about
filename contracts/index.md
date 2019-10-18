An Index is a list of locators sorted by score. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/index).

# Structs

## `Locator`

```java
struct Locator {
  address signaller;
  uint256 score;
  bytes32 data;
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
  address _signaller,
  uint256 _score,
  bytes32 _data
) external onlyOwner
```

| Param        | Type      | Description                                  |
| :----------- | :-------- | :------------------------------------------- |
| `_score`     | `uint256` | Score for placement in the list.             |
| `_signaller` | `address` | The account or contract setting the Locator. |
| `_data`      | `bytes32` | Arbitrary data.                              |

A successful `setLocator` emits a `SetLocator` event.

```java
event SetLocator(
  uint256 score,
  address indexed signaller,
  bytes32 indexed data
);
```

---

| Revert Reason         | Scenario                                        |
| :-------------------- | :---------------------------------------------- |
| `LOCATOR_ALREADY_SET` | A Locator by the same signaller is already set. |

## `unsetLocator`

Unset a Locator from the Index.

```java
function unsetLocator(
  address _signaller
) external onlyOwner returns (bool) {
```

A successful `unsetLocator` emits an `UnsetLocator` event.

```java
event UnsetLocator(
  address indexed signaller
);
```

| Param        | Type      | Description                                    |
| :----------- | :-------- | :--------------------------------------------- |
| `_signaller` | `address` | The account or contract unsetting the Locator. |

## `getLocator`

Gets the intent for a given ssender address.

```java
function getLocator(
  address _signaller
) external view returns (Locator memory)
```

| Param        | Type      | Description                         |
| :----------- | :-------- | :---------------------------------- |
| `_signaller` | `address` | The account or contract to look up. |

## `fetchLocators`

Fetch up to a number of locators from the list.

```java
function fetchLocators(
  uint256 _count
) external view returns (bytes32[] memory result) {
```

| Param    | Type      | Description                              |
| :------- | :-------- | :--------------------------------------- |
| `_count` | `uint256` | The maximum number of locators to fetch. |
