Platforma do zarzadzania wydarzeniami

uruchomienia postgressql 
sudo /Library/PostgreSQL/16/bin/pg_ctl start -D /Library/PostgreSQL/16/data
sudo su - postgres
/Library/PostgreSQL/16/bin/pg_ctl start -D /Library/PostgreSQL/16/data
/Library/PostgreSQL/16/bin/psql -U postgres
\c events

# ponowne polaczenie sie z bazą events
/Library/PostgreSQL/16/bin/psql -U postgres -d events

# komendy postgres 
SELECT * FROM users;
DROP TABLE users;

# migracje z dokumentacji knex
npm run knex
npm run knex -- migrate:make users
npm run knex -- migrate:up
npm run knex -- migrate:down  ##jesli chce usunac migracje poprzednia