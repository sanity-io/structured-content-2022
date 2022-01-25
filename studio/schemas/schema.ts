// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';
import richDate from 'part:@sanity/form-builder/input/rich-date/schema';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import article from './article';
import person from './person';
import session from './session';
import sponsor from './sponsor';
import venue from './venue';
import ticket from './ticket';
import sponsorship from './sponsorship';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: 'default',
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		/* Your types here! */
		richDate,
		article,
		person,
		session,
		sponsor,
		venue,
		sponsorship,
		ticket,
	]),
});
