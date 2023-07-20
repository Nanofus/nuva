<footer>
  <div class="footer-content">
    <span>© Klaanon</span>
    <span class="separator"></span>
    <span><a href="https://discord.com/channels/1043556208700833792/1131238873024966809"
             target="_blank">Palaute</a></span>
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