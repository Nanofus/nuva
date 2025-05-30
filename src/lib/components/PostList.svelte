<script lang="ts">
  import type { Category, PostMeta } from '$lib/types';
  import { t } from '$lib/client/localization';
  import { clientConfig } from '$lib/client/config';

  export let posts: PostMeta[];
  export let reverse: boolean | undefined = false;
  
  const parseCategories = (categories: Category[]) => {
    categories = categories.filter((c) => c.slug !== 'rope');
    if (categories.length === 0) return '';
    return `– ${categories.map((c) => c.name).join(', ')}`;
  };
</script>

<table>
  <tbody>
    <tr class="table-header">
      <td class="link">{t.components.postList.title}</td>
      <td class="comment-count hidden-mobile material-icons">forum</td>
      <td class="date">{t.components.postList.date}</td>
      <td class="authors hidden-mobile">{t.components.postList.author}</td>
    </tr>
    {#each (reverse ? posts.reverse() : posts) as post (post.slug)}
      <tr class={post.mobileFriendly ? '' : 'mobile-unfriendly'}>
        <td class="link">
          <a href="/posts/{post.slug}">{post.title}</a>
          <span class="categories">{parseCategories(post.categories)}</span>
        </td>
        <td class="comment-count hidden-mobile">{post.commentCount ? post.commentCount : ''}</td>
        <td class="date"><time class="post-date" datetime={post.date.toLocaleString()} title={post.date.toLocaleString()}>
          <a href={`/posts/date/${post.date.getFullYear()}-${post.date.getMonth() + 1}-${post.date.getDate()}`}>{post.date.toLocaleDateString(clientConfig.locale)}</a>
        </time></td>
        <td class="authors hidden-mobile"
        ><a href="/authors/{encodeURI(post.author.slug)}">{post.author.name}</a></td
        >
      </tr>
    {/each}
  </tbody>
</table>

<style lang="scss">
  .comment-count {
    text-align: center;
    font-size: 1rem;
  }

  @media screen and (max-width: 41rem) {
    // var(--mobile-threshold)
    .date {
      text-align: right;
    }

    .mobile-unfriendly {
      color: var(--hover);

      a,
      .categories {
        color: var(--hover);
      }
    }
  }

  .categories {
    color: var(--text-light-secondary);
    font-style: italic;
  }
</style>
