import * as React from "react";
import S from "@sanity/desk-tool/structure-builder";
import { IntentLink } from "part:@sanity/base/router";
import client from "part:@sanity/base/client";
import { Card, Container, Flex, Stack, Text } from "@sanity/ui";

export const SpecPreview = (props) => {
  const { document } = props;
  const { published } = document;
  if (!published) {
    return (
      <div style={{ padding: "1rem", maxWidth: "730px", margin: "0 auto" }}>
        <p>No content found.</p>
      </div>
    );
  }
  const [doc, setDoc] = React.useState({});
  React.useEffect(() => {
    const subscriber = client.observable
      .fetch(`*[_type == "spec" && references.route._ref == $route][0]`, {
        route: published._id,
      })
      .subscribe((doc) => setDoc(doc));
    return () => subscriber.unsubscribe();
  }, [props]);

  const { audience, topTask, businessGoal, fields } = doc;
  return (
    <Container padding={2}>
      <Card>
        <Stack space={4}>
          <Text>
            <strong>Primary audience</strong>: {audience}
          </Text>
          <Text>
            <strong>Top tasks</strong>
          </Text>
          {topTask && (
            <Stack space={2} marginLeft={2}>
              {topTask.map((task) => (
                <Text key={task}>{task}</Text>
              ))}
            </Stack>
          )}
          <Text>
            <strong>Business goal</strong>: {businessGoal}
          </Text>
          <Stack space={2}>
            <Text>Fields</Text>
            {fields &&
              fields.map((field) => (
                <Card radius={2} shadow={1} tone="primary">
                  <Stack space={2}>
                    <Flex key={field._key} padding={3}>
                      <Card flex={2}>
                        <Text>{field?.type}</Text>
                      </Card>
                      <Card flex={2}>
                        <Text>{field?.field}</Text>
                      </Card>
                      <Card flex={2}>
                        <Text>{field?.validation}</Text>
                      </Card>
                    </Flex>
                    <Flex padding={3}>
                      <Card flex={1}>
                        <Text>{field?.sample}</Text>
                      </Card>
                    </Flex>
                  </Stack>
                </Card>
              ))}
          </Stack>
          <pre>{JSON.stringify(doc, null, 2)}</pre>
        </Stack>
      </Card>
    </Container>
  );
};

export default S.view.component(SpecPreview).title("Content Spec Sheet");
