<script lang="ts">
  import { t } from "$lib/translations";
</script>

<footer>
  <div class="footer-content">
    <span>{t.components.footer.copyright}</span>
    <span class="separator" />
    <span
      ><a href={t.components.footer.feedbackLink} target="_blank">{t.components.footer.feedback}</a
      ></span
    >
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
        content: "|";
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
