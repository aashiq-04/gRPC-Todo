PROTO_SRC = proto/todo.proto
PROTO_OUT = proto

gen:
	@echo "Generating Go gRPC code..."
	@protoc \
		--go_out=$(PROTO_OUT) --go-grpc_out=$(PROTO_OUT) \
		--go_opt=paths=source_relative \
		--go-grpc_opt=paths=source_relative \
		$(PROTO_SRC)
	@echo "✓ Done!"

clean:
	@echo "Cleaning generated files..."
	@rm -f $(PROTO_OUT)/*.pb.go
	@echo "✓ Clean complete!"
