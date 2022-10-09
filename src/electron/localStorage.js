const schema = {
	app: {
    type: "object",
    properties: {
      x: {
        type: "number",
        default: 150
      },
      y: {
        type: "number",
        default: 150
      },
      width: {
        type: "number",
        default: 800
        },
      height: {
        type: "number",
        default: 600
        },
      minWidth: {
        type: "number",
        default: 600
        },
      minHeight: {
        type: "number",
        default: 500
        },
      theme: {
        enum: ["dark", "light"],
		    default: "dark"
        },
      database: {
        type: "number",
		    default: 1
        }
    }
  }
};
exports.schema = schema;
