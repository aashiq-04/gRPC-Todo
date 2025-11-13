import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";


// 1️⃣ Load proto file
const PROTO_PATH = path.resolve(__dirname, "../proto/todo.proto");

// 2️⃣ Define package options
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// 3️⃣ Load gRPC package definition
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;



// 4️⃣ Create client for TodoService
const client = new grpcObject.todo.TodoService(
  "localhost:9000",
  grpc.credentials.createInsecure()
);

// 5️⃣ Call AddTodo
client.AddTodo(
  { title: "Learn gRPC with Go", description: "Practicing with TypeScript client" },
  (err: any, response: any) => {
    if (err) console.error("Error:", err);
    else console.log("✅ AddTodo Response:", response.message);
  }
);

// 6️⃣ Wait and fetch all todos
setTimeout(() => {
  client.GetTodos({}, (err: any, response: any) => {
    if (err) console.error("Error:", err);
    else console.log("📝 Todo List:", response.todos);
  });
}, 1000);
