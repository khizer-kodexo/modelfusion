import {
  createJsonResponseHandler,
  postJsonToApi,
} from "../../../internal/postToApi.js";
import { failedOpenAICallResponseHandler } from "../internal/failedOpenAICallResponseHandler.js";
import {
  OpenAITextEmbeddingResponse,
  openAITextEmbeddingResponseSchema,
} from "./OpenAITextEmbeddingResponse.js";
import { OpenAITextEmbeddingModelType } from "./OpenAITextEmbeddingModel.js";

/**
 * Call the OpenAI Embedding API to generate an embedding for the given input.
 *
 * @see https://platform.openai.com/docs/api-reference/embeddings
 *
 * @example
 * const response = await generateOpenAITextEmbedding({
 *   apiKey: OPENAI_API_KEY,
 *   model: "text-embedding-ada-002",
 *   input: "At first, Nox didn't know what to do with the pup.",
 * });
 *
 * console.log(response.data[0].embedding);
 */
export async function generateOpenAITextEmbedding({
  baseUrl = "https://api.openai.com/v1",
  abortSignal,
  apiKey,
  model,
  input,
  user,
}: {
  baseUrl?: string;
  abortSignal?: AbortSignal;
  apiKey: string;
  model: OpenAITextEmbeddingModelType;
  input: string;
  user?: string;
}): Promise<OpenAITextEmbeddingResponse> {
  return postJsonToApi({
    url: `${baseUrl}/embeddings`,
    apiKey,
    body: {
      model,
      input,
      user,
    },
    failedResponseHandler: failedOpenAICallResponseHandler,
    successfulResponseHandler: createJsonResponseHandler(
      openAITextEmbeddingResponseSchema
    ),
    abortSignal,
  });
}