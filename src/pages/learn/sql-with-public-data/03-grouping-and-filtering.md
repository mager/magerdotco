---
layout: "../../../layouts/Learn.astro"
prevLink: "02-your-first-queries"
prevTitle: "Your First Queries"
nextLink: ""
nextTitle: ""
title: "Grouping and Filtering: Google Trends"
description: "Your first look at grouping data and filtering results, with data from Google search trends."
---

In the previous section, we made our first queries and learned about the `SELECT`, `LIMIT`, and `ORDER BY` statements. Next, we'll talk about the `WHERE` command which lets us filter results, and `GROUP BY` which lets us group results together by a particular field.

Let's play with a new dataset: [Google Trends data](https://console.cloud.google.com/bigquery?p=bigquery-public-data). You can always apply your new learnings to previous datasets.

Let's take a look at some sample data in the `international_top_terms` table:

```sql
SELECT
  country_name,
  week,
  term
FROM
  `bigquery-public-data.google_trends.international_top_terms`
LIMIT 5
```

It looks like there is one entry in this table for each week:

```
+--------------+------------+--------------+
| country_name |    week    |     term     |
+--------------+------------+--------------+
| Australia    | 2018-04-08 | Adelaide Cup |
| Australia    | 2018-07-01 | Adelaide Cup |
| Australia    | 2018-07-15 | Adelaide Cup |
| Australia    | 2018-07-22 | Adelaide Cup |
| Australia    | 2018-09-02 | Adelaide Cup |
+--------------+------------+--------------+
```

What if we want to find the top search terms from the Israel? The syntax for filtering is:

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

Let's try it:

```sql
SELECT
  country_name,
  region_name,
  week,
  term
FROM
  `bigquery-public-data.google_trends.international_top_terms`
WHERE
  country_name = "Israel"
LIMIT 5
```

The result tells us that Gwyneth Paltrow is very popular there.

```
+--------------+------------+-----------------+
| country_name |    week    |      term       |
+--------------+------------+-----------------+
| Israel       | 2018-04-15 | Gwyneth Paltrow |
| Israel       | 2018-06-03 | Gwyneth Paltrow |
| Israel       | 2018-06-10 | Gwyneth Paltrow |
| Israel       | 2018-06-17 | Gwyneth Paltrow |
| Israel       | 2018-09-23 | Gwyneth Paltrow |
+--------------+------------+-----------------+
```

In our sample response, we have some data from 2018, but what if we wanted to see the range of dates that's included in this table:

```sql
SELECT
  MIN(week) AS start_week,
  MAX(week) AS end_week
FROM
  `bigquery-public-data.google_trends.international_top_terms`
WHERE
  country_name = "Israel"
```

Let's break down the new syntax introduced here:

- `MIN(column_name)` - Min stands for minimum, and it finds the lowest value in that column
- `MAX(column_name)` - As you would imagine, max stands for maximum and it finds the highest value in that column
- `AS column_alias` - This lets us name the column (if we left this part out, BigQuery would have named the columns `col1`, and `col2` respectively)

The result is:

```
+------------+------------+
| start_week |  end_week  |
+------------+------------+
| 2018-03-18 | 2023-04-09 |
+------------+------------+
```

It looks like the dataset is up-to-date (at the writing of this tutorial, it's early April 2023).

Let's find all the latest search terms in each regoin for this week in Canada:

```sql
SELECT
  term,
  region_name
FROM
  `bigquery-public-data.google_trends.international_top_terms`
WHERE
  country_name = "Canada"
  AND week = "2023-04-09"
LIMIT 10
```

The result:

```
+---------------+---------------------------+
|     term      |        region_name        |
+---------------+---------------------------+
| Amanda Bynes  | British Columbia          |
| Blue Jays     | Manitoba                  |
| Bruins        | Manitoba                  |
| Bruins        | Newfoundland and Labrador |
| CPI           | British Columbia          |
| CPI           | Northwest Territories     |
| CPI           | Nunavut                   |
| Carol Burnett | Manitoba                  |
| Carol Burnett | New Brunswick             |
| Carol Burnett | Newfoundland and Labrador |
+---------------+---------------------------+
```

If you looked at the query carefully, we added a new word: `AND`. This lets us combine our `WHERE` filters.

TODO
