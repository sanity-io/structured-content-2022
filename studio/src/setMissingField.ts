import sanityClient from "part:@sanity/base/client";

const versionedClient = sanityClient.withConfig({
  apiVersion: "2021-03-15",
});

/**
 *
 * Sets the field to the provided value, only if it is missing for the provided type.
 *
 * ## Usage
 * Simply put this in a schema-file: then it will run during studio start.
 * It is idempotent, so rerunning it should be safe (when the path has value, nothing is done).
 *
 * `setMissingField('my-type', 'path.to.field', 'value-to-set').catch(console.error);`
 *
 * ## Caveates
 * For this to work, parent object must already exist for nested objects.
 *
 * @param type document type name
 * @param path jsonpath, eg: some.nested.field
 * @param value the value to setIfMissing for the field
 */
export async function setMissingField(
  type: string,
  path: string,
  value: unknown
) {
  const transaction = versionedClient.transaction();
  const ids: string[] = await versionedClient.fetch(
    `* [_type=="${type}" && !defined(${path})]._id`
  );

  console.log(`patching path ${path} for ids`, ids);

  ids.forEach((id) => {
    const patch = versionedClient.patch(id).setIfMissing({
      [path]: value,
    });
    transaction.patch(patch);
  });
  return transaction.commit();
}
