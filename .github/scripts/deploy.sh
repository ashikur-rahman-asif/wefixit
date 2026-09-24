#!/usr/bin/env bash
# deploy.sh <image> <container-app-name> <resource-group>

set -euo pipefail

IMAGE="${1:?arg 1 required: full image URI}"
APP_NAME="${2:?arg 2 required: Azure Container App name}"
RESOURCE_GROUP="${3:?arg 3 required: Azure resource group}"

echo "Deploying: ${IMAGE} -> ${APP_NAME}"

az containerapp update \
  --name           "${APP_NAME}" \
  --resource-group "${RESOURCE_GROUP}" \
  --image          "${IMAGE}" \
  --output         none

echo "Waiting for revision to reach Running state (max 3 min)..."

MAX_WAIT=180
ELAPSED=0
INTERVAL=10

while true; do
  RUNNING_STATE=$(
    az containerapp revision list \
      --name           "${APP_NAME}" \
      --resource-group "${RESOURCE_GROUP}" \
      --query "[?properties.active==\`true\`] | sort_by(@, &properties.createdTime) | [-1].properties.runningState" \
      --output tsv 2>/dev/null || echo "unknown"
  )

  echo "  state: ${RUNNING_STATE} (${ELAPSED}s)"

  if [[ "${RUNNING_STATE}" == "Running" ]]; then
    echo "Done."
    break
  fi

  if [[ "${ELAPSED}" -ge "${MAX_WAIT}" ]]; then
    echo "ERROR: Timed out."
    exit 1
  fi

  sleep "${INTERVAL}"
  ELAPSED=$(( ELAPSED + INTERVAL ))
done
