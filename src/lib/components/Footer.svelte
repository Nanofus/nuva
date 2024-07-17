<script lang="ts">
  import { t } from '$lib/util/translations';
  import { globalConfig } from '$lib/util/config';
</script>

<footer>
  <div class="footer-content">
    <span>{globalConfig.copyright}</span>
    <span class="separator" />
    <span><a href="{globalConfig.baseUrl}/rss" target="_blank">RSS</a></span>
    <span class="separator" />
    <span>
      <a href={globalConfig.urls.feedback} target="_blank">{t.components.footer.feedback}</a>
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
