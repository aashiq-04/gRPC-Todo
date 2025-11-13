package main

import (
	"context"
	"fmt"
	"log"
	"net"
	pb "github.com/aashiq-04/gRPC-Todo/proto"
	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedTodoServiceServer
	todos []*pb.Todo
}

// ==============================
// AddTodo
// ==============================
func (s *server) AddTodo(ctx context.Context, req *pb.TodoRequest) (*pb.TodoResponse, error) {
	todo := &pb.Todo{
		Title:       req.Title,
		Description: req.Description,
	}
	s.todos = append(s.todos, todo)
	return &pb.TodoResponse{Message: "Todo added"}, nil
}

// ==============================
// GetTodos
// ==============================
func (s *server) GetTodos(ctx context.Context, _ *pb.Empty) (*pb.TodoList, error) {
	return &pb.TodoList{Todos: s.todos}, nil
}

// ==============================
// MAIN
// ==============================
func main() {

	lis, err := net.Listen("tcp", ":9000")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()

	pb.RegisterTodoServiceServer(grpcServer, &server{})

	fmt.Println("gRPC server running on :9000")

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to serve : %v", err)
	}
}
