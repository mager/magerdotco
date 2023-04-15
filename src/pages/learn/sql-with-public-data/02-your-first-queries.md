---
layout: "../../../layouts/Learn.astro"
prevLink: "01-getting-started"
prevTitle: "Getting Started"
nextLink: "03-grouping-and-filtering"
nextTitle: "Grouping and Filtering: Google Trends"
title: "Your First Queries: College Mascots"
description: "We'll explore the SELECT command by looking at college mascot data."
---

Are you ready to query some real data? We'll start off with a very basic dataset: a list of ~350 college mascots.

In SQL, tables are the primary way to store and organize data. A table is a collection of related data organized into rows and columns. Each row represents a single entity in the dataset, while each column represents a specific attribute or characteristic of that entity.

For example, in our college [mascot dataset](https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=ncaa_basketball&page=dataset&ws=!1m5!1m4!4m3!1sbigquery-public-data!2sncaa_basketball!3smascots), we have a table with columns such as `market`, `mascot_name`, `tax_subspecies`, etc. Each row in the table would represent a different college mascot, with its corresponding information in each column.

## The SELECT statement

The SELECT command is used to retrieve data from one or more tables in a database. It allows you to specify which columns you want to retrieve and can also include conditions for filtering the data.

The basic syntax of the SELECT command is as follows:

```sql
SELECT column1, column2
FROM table_name;
```

Here, `column1` and `column2` refer to the specific columns you want to retrieve data from, and `table_name` is the name of the table containing that data.

Let's fetch some data from the `ncaa_basketball.mascots` table. The BigQuery UI has a nice page with a list of all the columns:

![BigQuery public data columns](/images/learn/sql-with-public-data/02-columns.png)

You can also use the `bq show` command to view the table's schema. Here, I pipe the output to [`jq`](https://stedolan.github.io/jq/) to make it more readable:

```sh
bq show --schema --format=prettyjson \
    bigquery-public-data:ncaa_basketball.mascots | jq '.[].name'
```

The output is:

```sh
"id"
"market"
"name"
"mascot"
"mascot_name"
"mascot_common_name"
"tax_subspecies"
"tax_species"
"tax_genus"
"tax_family"
"tax_order"
"tax_class"
"tax_phylum"
"tax_kingdom"
"tax_domain"
"non_tax_type"
```

Another way to explore a new table is just to `SELECT *`. Let's start there with the `bq CLI`:

```
bq query 'SELECT * FROM `bigquery-public-data.ncaa_basketball.mascots`'
```

We got some data back!

![Data](/images/learn/sql-with-public-data/02-first-query.png)

This is hard to read; there are a bunch of `NULL` columns, so let's try only selecting few columns. (From here on out, I'll just be using the raw SQL. You can choose whether you want to use the `bq` CLI or the BigQuery web UI):

```sql
SELECT
  market,
  name,
  mascot,
  mascot_name,
  non_tax_type
FROM
  `bigquery-public-data.ncaa_basketball.mascots`
LIMIT 5
```

You will also notice that we limited the result set to 5 with the `LIMIT` command. This always goes at the end. The output is a bit better now:

```
+---------------+------------------+-----------+-----------------------+--------------+
|    market     |       name       |  mascot   |      mascot_name      | non_tax_type |
+---------------+------------------+-----------+-----------------------+--------------+
| Tulsa         | Golden Hurricane | Hurricane | Captain Cane          | Weather      |
| Arizona State | Sun Devils       | Devil     | Sparky                | Devils       |
| Drexel        | Dragons          | Dragon    | Mario the Magnificent | Dragons      |
| Bradley       | Braves           | Gargoyle  | Kaboom!               | NULL         |
| Canisius      | Golden Griffins  | Griffin   | Petey                 | Griffins     |
+---------------+------------------+-----------+-----------------------+--------------+
```

Another thing we can do is order the results by one of the columns. For example, let's say we want to see the list ordered by the name alphabetically:

```sql
SELECT
  market,
  name,
  mascot,
  mascot_name,
  non_tax_type
FROM
  `bigquery-public-data.ncaa_basketball.mascots`
ORDER BY
  name
LIMIT 10
```

The result is:

```
+--------------------+-----------+--------------------+--------------------+---------------+
|       market       |   name    |       mascot       |    mascot_name     | non_tax_type  |
+--------------------+-----------+--------------------+--------------------+---------------+
| Long Beach State   | 49ers     | 49er               | Prospector Pete    | 49ers         |
| Charlotte          | 49ers     | 49er               | Norm               | 49ers         |
| Evansville         | Aces      | Riverboat Gambler  | Ace Purple         | Entrepreneurs |
| Texas A&M          | Aggies    | Dustdevil          | Dusty              | Weather       |
| New Mexico State   | Aggies    | Cowboy             | Pistol Pete        | Cowboys       |
| North Carolina A&T | Aggies    | Bulldog            | Aggie and Aggietha | NULL          |
| UC Davis           | Aggies    | Mustang            | Gunrock            | NULL          |
| Utah State         | Aggies    | Bull               | Big Blue           | NULL          |
| UC Irvine          | Anteaters | Anteater           | Peter              | NULL          |
| Grand Canyon       | Antelopes | Pronghorn Antelope | Thunder            | NULL          |
+--------------------+-----------+--------------------+--------------------+---------------+
```

What if we wanted to find out all mascots that contain the word "dog", or the most common mascot name? Continue on to the next section to learn about filtering and grouping.
