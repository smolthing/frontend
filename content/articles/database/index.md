---
title: Databases
description: Everything about databases.
date: "2024-02-03"
categories:
  - "database"
keywords:
  - "database"
---

## Relational Databases
### Relational database: MySQL
Use Case: Financial transactions, shopping cart, bank, product catalogs, employee records, reporting system

Characteristics:
- ACID properties: Atomicity, Consistency, Isolation, Durability
- Strong consistency
- Transactional - All operations executed or none
- Normalized, no redundancy
- Support complex joins
- Good performance in read-heavy scenarios and simple queries. InnoDB, the default storage engine, provides good support for transactional processing.

Suitable
- High read and write
- Excellent performance in OLAP (Online Analytical Processing) and OLTP (Online Transaction Processing) scenarios.

```js
-- Display data from users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS items (
    item_id INT PRIMARY KEY,
    user_id INT,
    item_name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    purchase_date DATE
);

INSERT INTO users (user_id, username, email) VALUES
(1, 'user1', 'user1@example.com'),
(2, 'user2', 'user2@example.com');


INSERT INTO items (item_id, user_id, item_name, category, price, purchase_date) VALUES
(1, 1, 'Laptop', 'Electronics', 1200.00, '2024-02-03'),
(2, 1, 'Headphones', 'Electronics', 99.99, '2024-02-01'),
(3, 2, 'Bookshelf', 'Furniture', 299.99, '2024-01-28');

SELECT * FROM users;

user_id | username | email
--------+----------+---------------------
1       | user1    | user1@example.com
2       | user2    | user2@example.com

SELECT * FROM items;

item_id | user_id | item_name   | category   | price   | purchase_date 
--------+---------+-------------+------------+---------+----------------
1       | 1       | Laptop      | Electronics| 1200.00| 2024-02-03
2       | 1       | Headphones  | Electronics| 99.99  | 2024-02-01
3       | 2       | Bookshelf   | Furniture  | 299.99 | 2024-01-28

```

### PostgreSQL
Use Case: Employee Records

Characteristics:
- ACID compliance, good for robust transactional support
- Supports a broader range of data types, including advanced types like hstore, JSON, and arrays. It also allows users to define custom data types.
- Provide support for complex queries, advanced indexing, and functions.

Suitable
- High read and write

```
Almost similar to MySQL as both use SQL.
```

## Non Relational Database
### Key-value database: DynamoDb
Use Case: Settings, Session Storage, Caching, Real-time analytics, Leaderboard

Characteristics:
- High throughput with low latency
- Denormalized, duplicated data
- Schema-less - Add new attributes without affecting table schema

Suitable
- High throughput, low latency

```js
aws dynamodb create-table \
  --table-name ItemsTable \
  --attribute-definitions \
    AttributeName=UserID,AttributeType=S \
    AttributeName=ItemID,AttributeType=S \
  --key-schema \
    AttributeName=UserID,KeyType=HASH \
    AttributeName=ItemID,KeyType=RANGE \
  --provisioned-throughput \
    ReadCapacityUnits=5,WriteCapacityUnits=5

aws dynamodb batch-write-item \
  --request-items '{
    "ItemsTable": [
      {
        "PutRequest": {
          "Item": {
            "UserID": {"S": "user1"},
            "ItemID": {"S": "item123"},
            "ItemName": {"S": "Laptop"},
            "Category": {"S": "Electronics"},
            "Price": {"N": "1200.00"},
            "PurchaseDate": {"S": "2024-02-03"},
            "Tag": {"S": "High-end"}
          }
        }
      },
      {
        "PutRequest": {
          "Item": {
            "UserID": {"S": "user1"},
            "ItemID": {"S": "item456"},
            "ItemName": {"S": "Headphones"},
            "Category": {"S": "Electronics"},
            "Price": {"N": "99.99"},
            "PurchaseDate": {"S": "2024-02-01"},
            "Tag": {"S": "Wireless"}
          }
        }
      },
      {
        "PutRequest": {
          "Item": {
            "UserID": {"S": "user2"},
            "ItemID": {"S": "item789"},
            "ItemName": {"S": "Bookshelf"},
            "Category": {"S": "Furniture"},
            "Price": {"N": "299.99"},
            "PurchaseDate": {"S": "2024-01-28"},
            "Tag": {"S": "Wooden"}
          }
        }
      }
    ]
  }'

[
  {
    "UserID": "user1",
    "ItemID": "item123",
    "ItemName": "Laptop",
    "Category": "Electronics",
    "Price": 1200.00,
    "PurchaseDate": "2024-02-03",
    "Tag": "High-end"
  },
  {
    "UserID": "user1",
    "ItemID": "item456",
    "ItemName": "Headphones",
    "Category": "Electronics",
    "Price": 99.99,
    "PurchaseDate": "2024-02-01",
    "Tag": "Wireless"
  },
  {
    "UserID": "user2",
    "ItemID": "item789",
    "ItemName": "Bookshelf",
    "Category": "Furniture",
    "Price": 299.99,
    "PurchaseDate": "2024-01-28",
    "Tag": "Wooden"
  }
]
```

### Document database: MongoDb
Use Case: Content management, user profiles, catalog, blog

Characteristics:
- Flexible schema
- Scalability and high performance in write-intensive operations.

Suitable
- Write intensive

```
// MongoDB Collection: UserItems

const itemSchema = new Schema({
  itemID: String,
  itemName: String,
  category: String,
  price: Number,
  purchaseDate: Date,
  tag: String
});

const userSchema = new Schema({
  userID: String,
  items: [itemSchema]
});

const User = mongoose.model('User', userSchema);

const user1 = new User({
  userID: 'user1',
  items: [
    {
      itemID: 'item123',
      itemName: 'Laptop',
      category: 'Electronics',
      price: 1200.00,
      purchaseDate: new Date('2024-02-03'),
      tag: 'High-end'
    },
    {
      itemID: 'item456',
      itemName: 'Headphones',
      category: 'Electronics',
      price: 99.99,
      purchaseDate: new Date('2024-02-01'),
      tag: 'Wireless'
    }
  ]
});

user1.save()
  .then(() => console.log('Document inserted successfully'))
  .catch(err => console.error(err))
  .finally(() => mongoose.connection.close());

{
  "_id": ObjectId("5f7486514f78a53f508d7a52"),
  "userID": "user1",
  "items": [
    {
      "itemID": "item123",
      "itemName": "Laptop",
      "category": "Electronics",
      "price": 1200.00,
      "purchaseDate": ISODate("2024-02-03"),
      "tag": "High-end"
    },
    {
      "itemID": "item456",
      "itemName": "Headphones",
      "category": "Electronics",
      "price": 99.99,
      "purchaseDate": ISODate("2024-02-01"),
      "tag": "Wireless"
    }
  ]
}
```

### Graph Database: Neo4j
Use Case: Social network, fraud detection, recommendation engines, network analysis

Characteristics:
- Focus on relationships and patterns

Suitable
- Complex pattern matching

```
// Create User Nodes
CREATE (:User {userID: 'user1'})
CREATE (:User {userID: 'user2'})

// Create Item Nodes with Relationships to User Nodes
CREATE (:Item {itemID: 'item123', itemName: 'Laptop', category: 'Electronics', price: 1200.00, purchaseDate: '2024-02-03'})-[:OWNED_BY]->(:User {userID: 'user1'})
CREATE (:Item {itemID: 'item456', itemName: 'Headphones', category: 'Electronics', price: 99.99, purchaseDate: '2024-02-01'})-[:OWNED_BY]->(:User {userID: 'user1'})
CREATE (:Item {itemID: 'item789', itemName: 'Bookshelf', category: 'Furniture', price: 299.99, purchaseDate: '2024-01-28'})-[:OWNED_BY]->(:User {userID: 'user2'})

// Create Tag Nodes and Relationships to Item Nodes
CREATE (:Tag {tagName: 'High-end'})
CREATE (:Tag {tagName: 'Wireless'})
CREATE (:Tag {tagName: 'Wooden'})

// Adding Tags to Item Nodes
MATCH (i:Item {itemID: 'item123'})-[:OWNED_BY]->(u:User {userID: 'user1'})
MATCH (t:Tag {tagName: 'High-end'})
CREATE (i)-[:TAGGED_WITH]->(t)

MATCH (i:Item {itemID: 'item456'})-[:OWNED_BY]->(u:User {userID: 'user1'})
MATCH (t:Tag {tagName: 'Wireless'})
CREATE (i)-[:TAGGED_WITH]->(t)

MATCH (i:Item {itemID: 'item789'})-[:OWNED_BY]->(u:User {userID: 'user2'})
MATCH (t:Tag {tagName: 'Wooden'})
CREATE (i)-[:TAGGED_WITH]->(t)

// User Nodes
(:User {userID: 'user1'})
(:User {userID: 'user2'})

// Item Nodes with Relationships to User Nodes
(:Item {itemID: 'item123', itemName: 'Laptop', category: 'Electronics', price: 1200.00, purchaseDate: '2024-02-03'}) -[:OWNED_BY]-> (:User {userID: 'user1'})
(:Item {itemID: 'item456', itemName: 'Headphones', category: 'Electronics', price: 99.99, purchaseDate: '2024-02-01'}) -[:OWNED_BY]-> (:User {userID: 'user1'})
(:Item {itemID: 'item789', itemName: 'Bookshelf', category: 'Furniture', price: 299.99, purchaseDate: '2024-01-28'}) -[:OWNED_BY]-> (:User {userID: 'user2'})

// Tag Nodes and Relationships to Item Nodes
(:Tag {tagName: 'High-end'})
(:Tag {tagName: 'Wireless'})
(:Tag {tagName: 'Wooden'})

// Adding Tags to Item Nodes
(:Item {itemID: 'item123', itemName: 'Laptop', category: 'Electronics', price: 1200.00, purchaseDate: '2024-02-03', tag: 'High-end'}) -[:TAGGED_WITH]-> (:Tag {tagName: 'High-end'})
(:Item {itemID: 'item456', itemName: 'Headphones', category: 'Electronics', price: 99.99, purchaseDate: '2024-02-01', tag: 'Wireless'}) -[:TAGGED_WITH]-> (:Tag {tagName: 'Wireless'})
(:Item {itemID: 'item789', itemName: 'Bookshelf', category: 'Furniture', price: 299.99, purchaseDate: '2024-01-28', tag: 'Wooden'}) -[:TAGGED_WITH]-> (:Tag {tagName: 'Wooden'})

```

### Wide Column database: Cassandra
Use Case: Time-series data, event logging, sensor data storage

Characteristics:
- Write-intensive with horizontal scalability
- No complex joins, query-driven
- Different rows can have different columns

Suitable
- Write intensive

```
-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY,
    username TEXT,
    email TEXT
);

-- Alter the users table to add the email column
ALTER TABLE users ADD email TEXT;

-- Insert data into the users table
INSERT INTO users (user_id, email, username) VALUES 
  (73e15d2b-b0a9-45fe-9c67-9071df3a61e0, 'user1@example.com', 'user1'),
  (83b8ed8f-aaae-46bc-80db-3bb7df6eb67e, 'user2@example.com', 'user2');

-- Create the items table
CREATE TABLE IF NOT EXISTS items (
    user_id UUID,
    item_id UUID PRIMARY KEY,
    category TEXT,
    item_name TEXT,
    price DECIMAL,
    purchase_date TIMESTAMP,
    tags SET<TEXT>
);

-- Insert data into the items table
INSERT INTO items (user_id, item_id, category, item_name, price, purchase_date, tags) VALUES 
  (73e15d2b-b0a9-45fe-9c67-9071df3a61e0, e0d5b3d4-af42-4f01-823c-54aa53b1a7d9, 'Electronics', 'Laptop', 1200.0, '2024-02-03', {'High-end'}),
  (73e15d2b-b0a9-45fe-9c67-9071df3a61e0, 5e62d18a-79e3-4cf0-9a2b-96dd6d54116d, 'Electronics', 'Headphones', 99.99, '2024-02-01', {'Wireless'}),
  (83b8ed8f-aaae-46bc-80db-3bb7df6eb67e, a6e717b3-58bc-4e78-8cd5-c79a4d481086, 'Furniture', 'Bookshelf', 299.99, '2024-01-28', {'Wooden'});

-- Create the tags table
CREATE TABLE IF NOT EXISTS tags (
    tag_name TEXT PRIMARY KEY
);

-- Insert data into the tags table
INSERT INTO tags (tag_name) VALUES ('High-end'), ('Wireless'), ('Wooden');


-- users table
SELECT * FROM users;

user_id                                | email              | username
--------------------------------------+--------------------+----------
73e15d2b-b0a9-45fe-9c67-9071df3a61e0 | user1@example.com  | user1
83b8ed8f-aaae-46bc-80db-3bb7df6eb67e | user2@example.com  | user2

-- Select data from the items table
SELECT * FROM items;

user_id                                | item_id                              | category   | item_name | price  | purchase_date                   | tags
--------------------------------------+--------------------------------------+------------+-----------+--------+---------------------------------+--------------
73e15d2b-b0a9-45fe-9c67-9071df3a61e0 | e0d5b3d4-af42-4f01-823c-54aa53b1a7d9 | Electronics | Laptop    | 1200.0 | 2024-02-03 00:00:00.000000000 | {'High-end'}
73e15d2b-b0a9-45fe-9c67-9071df3a61e0 | 5e62d18a-79e3-4cf0-9a2b-96dd6d54116d | Electronics | Headphones | 99.99 | 2024-02-01 00:00:00.000000000 | {'Wireless'}
83b8ed8f-aaae-46bc-80db-3bb7df6eb67e | a6e717b3-58bc-4e78-8cd5-c79a4d481086 | Furniture   | Bookshelf  | 299.99 | 2024-01-28 00:00:00.000000000 | {'Wooden'}

-- Select data from the tags table
SELECT * FROM tags;

tag_name
----------
High-end
Wireless
Wooden
```


### Time Series: InfluxDB
Use Case: Sensor data, monitoring metrics, log data, financial market data

Characteristics:
- High write for time series data
- Optimized for storing and querying time-stamped data

Suitable
- Storing and querying time-stamped data

```js
CREATE DATABASE measurement
SELECT * FROM measurement WHERE location='room1' AND time >= '2024-06-30T00:00:00Z'

INSERT temperature,location=room1 value=23.5 1625136000000000000

```
