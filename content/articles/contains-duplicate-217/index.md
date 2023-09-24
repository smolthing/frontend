---
title: "Contains Duplicate"
description: "Leetcode 217"
date: "2023-09-24"
categories:
  - "Leetcode"
keywords:
  - "leetcode"
  - "array&hashing"
---

## Leetcode: Contains Duplicate

Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

Approaches:
1. Check each element with the remaining elements. O(n^2)
1. Sort and check the adjacent elements. O(nlogn)
1. Store the elements in the hashmap, check if present. O(n)
1. Use hashset to compare the number of unique elements. O(n)

**TL;DR** 4. Use built-in set to find duplicate because it's easy.

Python
```python
class Solution:
    def containsDuplicdate(self, nums: List[int]) -> bool:
        return len(nums) != len(set(nums))
```
- Time Complexity: O(n) [Python Time Complexity](https://wiki.python.org/moin/TimeComplexity) set(): O(n), len(): O(1)
- Space Complexity: O(1)

JavaScript
```js
var containsDuplicate = function(nums) {
    return nums.length != new Set(nums).size;
};
```
- Time Complexity: O(n)
- Space Complexity: O(1)

Java
```Java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        var set = new HashSet<>();

        for (int element: nums) {
            if (set.contains(element)) {
                return true;
            }
            set.add(element);
        }

        return false;
    }
}
```
- Time Complexity: O(n)
- Space Complexity: O(n)

