<script lang="ts">
  import { t } from '$lib/client/localization';
  import { clientConfig } from '$lib/client/config';
</script>

<footer>
  <div class="footer-content">
    <span>{clientConfig.copyright}</span>
    <span class="separator"></span>
    <span><a href="{clientConfig.baseUrl}/rss" target="_blank">RSS</a></span>
    <span class="separator"></span>
    <span>
      <a href={clientConfig.urls.feedback} target="_blank">{t.components.footer.feedback}</a>
    </span>
    <span class="separator"></span>
    <span>
      <a href={clientConfig.urls.about} target="_blank">{t.components.footer.about}</a>
    </span>
  </div>
</footer>

<style lang="scss">
  footer {
    height: var(--footer-height);
    color: var(--text-dark);
    text-align: center;

    .separator {
      margin-left: 1rem;
      margin-right: 1rem;

      &:before {
        content: '|';
      }
    }

    .footer-content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
</style>
