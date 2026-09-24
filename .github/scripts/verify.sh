#!/usr/bin/env bash
# verify.sh <container-app-name> <resource-group> <expected-image>

set -euo pipefail

APP_NAME="${1:?arg 1 required: Azure Container App name}"
RESOURCE_GROUP="${2:?arg 2 required: Azure resource group}"
EXPECTED_IMAGE="${3:?arg 3 required: Expected full image URI}"

echo "Verifying: ${APP_NAME} -> ${EXPECTED_IMAGE}"

ACTUAL_IMAGE=$(
  az containerapp show \
    --name           "${APP_NAME}" \
    --resource-group "${RESOURCE_GROUP}" \
    --query          "properties.template.containers[0].image" \
    --output         tsv
)

echo "  actual: ${ACTUAL_IMAGE}"

if [[ "${ACTUAL_IMAGE}" == "${EXPECTED_IMAGE}" ]]; then
  echo "Verification PASSED."
else
  echo "ERROR: Verification FAILED."
  echo "  expected: ${EXPECTED_IMAGE}"
  echo "  actual:   ${ACTUAL_IMAGE}"
  exit 1
fi

