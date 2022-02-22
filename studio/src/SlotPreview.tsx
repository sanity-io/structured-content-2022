import * as React from "react";
import { withDocument } from "part:@sanity/form-builder";

function SlotPreview(props) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}

export default withDocument(SlotPreview);
