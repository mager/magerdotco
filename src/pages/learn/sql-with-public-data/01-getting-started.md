---
layout: "../../../layouts/LearnSQL.astro"
prevLink: ""
prevTitle: ""
nextLink: "/02-your-first-queries"
nextTitle: "Your First Queries: College Mascots"
title: "Getting Started"
description: "Start by setting up your environment, and getting familiar with the database tables we'll explore."
---

Welcome to the world of SQL! Are you ready to dive into the exciting world of relational databases? Whether you're a seasoned coder or a beginner, this class is designed to give you the skills and knowledge you need to write effective SQL queries.

If you're new to coding, don't worry - we'll start with the basics and guide you through the fundamentals of SQL. And if you're already familiar with other programming languages, you'll find that SQL is a powerful tool that can help you organize and manipulate data more efficiently than ever before.

By the end of this learning journey, you'll be able to write SQL queries with confidence, and you'll have a solid foundation for further exploration into the world of database management. So let's get started - together, we'll unlock the full potential of SQL!

## Prerequisites

For this guide, we're going to use BigQuery which is part of Google Cloud. BigQuery has a [ton of public datasets](https://cloud.google.com/bigquery/public-data) that are free to query for the first 1 TB of data per month, and we won't nearly come close to that. Sign up for Google Cloud and install the [bq command line tool](https://cloud.google.com/bigquery/docs/bq-command-line-tool). BigQuery public datasets are free to query for the first 1 TB of data per month). If you don't want to use the `bq` tool, you can run any of these queries in the BigQuery web UI.

I like the `bq` tool for quickly running queries to explore data. I usually tweak queries there, and then copy it over to the BigQuery UI when I want to start visualizing data and doing more data science-y things.

_If you have never used the command line, I recommend checking out Chapter 1 of [Conquering the Command Line](https://conqueringthecommandline.com/book)_

## Config file

Open up your Terminal application (Applications > Utilities) and create a file in your home directory called `.bigqueryrc`:

```sh
echo "[query]\n  --use_legacy_sql=false" >> ~/.bigqueryrc
```

This magic piece of code does a few things:

- The `echo` command is basically just a print statement
- This string `"[query]\n  --use_legacy_sql=false"` is a defining a single `query` rule to not use legacy SQL
- `>>` is a bash operator for appending content to a file
- `~/.bigqueryrc` is the location of the BigQuery config file
