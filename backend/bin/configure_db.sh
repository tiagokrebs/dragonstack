#!/bin/bash

export PGPASSWORD='node_password'

echo "Configuring dragonstackdb"

#psql -h localhost -U node_user dragonstackdb

dropdb -h localhost -U node_user dragonstackdb
createdb -h localhost -U node_user dragonstackdb

psql -h localhost -U node_user dragonstackdb < ./bin/sql/generation.sql
psql -h localhost -U node_user dragonstackdb < ./bin/sql/dragon.sql
psql -h localhost -U node_user dragonstackdb < ./bin/sql/trait.sql
psql -h localhost -U node_user dragonstackdb < ./bin/sql/dragonTrait.sql

node ./bin/insertTraits.js

echo "dragonstackdb configured"