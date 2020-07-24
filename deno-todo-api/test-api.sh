echo 'Show todos'
curl http://localhost:8080/todos/ | jq

echo 'Create todo'
curl -d '{ "task": "dome something", "done": false }' -H "Content-Type: application/json" -X POST http://localhost:8080/todos | jq
