#!/usr/bin/env bash
# azure-setup.sh — One-time Azure OIDC setup for GitHub Actions.
# Run locally with az login active.
#
# Usage:
#   GITHUB_ORG=ashikur-rahman-asif GITHUB_REPO=wefixit bash .github/scripts/azure-setup.sh

set -euo pipefail

GITHUB_ORG="${GITHUB_ORG:?Set GITHUB_ORG}"
GITHUB_REPO="${GITHUB_REPO:?Set GITHUB_REPO}"

SUBSCRIPTION_ID="ec89c801-8976-4387-84fd-da0fe4fa7288"
RESOURCE_GROUP="wefixitregistry"
ACR_NAME="wefixitregistryuae"
CONTAINER_APP="wefixit-frontend-prod"
APP_DISPLAY_NAME="github-wefixit-frontend"

echo "==> Setting subscription..."
az account set --subscription "${SUBSCRIPTION_ID}"

echo "==> Creating Azure AD App: ${APP_DISPLAY_NAME}"
APP_OUTPUT=$(az ad app create --display-name "${APP_DISPLAY_NAME}" --output json)
CLIENT_ID=$(echo "${APP_OUTPUT}" | python3 -c "import sys,json; print(json.load(sys.stdin)['appId'])")
echo "    Client ID: ${CLIENT_ID}"

echo "==> Creating Service Principal..."
az ad sp create --id "${CLIENT_ID}" --output none

echo "==> Assigning AcrPush on ${ACR_NAME}..."
az role assignment create \
  --assignee "${CLIENT_ID}" \
  --role     "AcrPush" \
  --scope    "/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.ContainerRegistry/registries/${ACR_NAME}" \
  --output   none

echo "==> Assigning Contributor on ${CONTAINER_APP}..."
az role assignment create \
  --assignee "${CLIENT_ID}" \
  --role     "Contributor" \
  --scope    "/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.App/containerApps/${CONTAINER_APP}" \
  --output   none

echo "==> Creating Federated Credential for ${GITHUB_ORG}/${GITHUB_REPO} (main)..."
az ad app federated-credential create \
  --id "${CLIENT_ID}" \
  --parameters "$(python3 -c "
import json
print(json.dumps({
    'name': 'github-main',
    'issuer': 'https://token.actions.githubusercontent.com',
    'subject': 'repo:${GITHUB_ORG}/${GITHUB_REPO}:ref:refs/heads/main',
    'description': 'GitHub Actions main branch deploy',
    'audiences': ['api://AzureADTokenExchange']
}))
")" \
  --output none

TENANT_ID=$(az account show --query tenantId --output tsv)

echo ""
echo "================================================================"
echo "  Add these as GitHub Repository Secrets:"
echo "  AZURE_CLIENT_ID       ${CLIENT_ID}"
echo "  AZURE_TENANT_ID       ${TENANT_ID}"
echo "  AZURE_SUBSCRIPTION_ID ${SUBSCRIPTION_ID}"
echo ""
echo "  Add these as GitHub Repository Variables:"
echo "  NEXT_PUBLIC_API_URL                  https://api.wefixitt.tech/api"
echo "  BACKEND_API_URL                      https://api.wefixitt.tech/api"
echo "  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY   pk_test_..."
echo "================================================================"

